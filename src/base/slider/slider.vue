<template>
<!-- 自己封装的轮播图slider组件开发 -->
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <!-- 轮播图上的小点点 -->
    <div class="dots">
      <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots" :key="index"></span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import {addClass} from 'common/js/dom'
// 给移动端使用的, 类似iScroll
import BScroll from 'better-scroll'

export default {
  name: 'slider',
  // props从外部输入实参, 控制组件
  props: {
    // 循环轮播
    loop: {
      type: Boolean,
      default: true
    },
    // 自动轮播
    autoPlay: {
      type: Boolean,
      default: true
    },
    // 自动轮播的间隔
    interval: {
      type: Number,
      default: 4000
    }
  },
  data () {
    return {
      dots: [], // 小圆点的数组
      currentPageIndex: 0 // 当前滚动的第几张图片
    }
  },
  // 在此钩子函数中 初始化slider
  mounted () {
    // 浏览器的刷新通常是17ms一次, 可以用this.nextTick(), 所以这里用20ms刷新一次
    setTimeout(() => {
      // 设置轮播图片的宽度
      this._setSliderWidth()
      // 初始化dots
      this._initDots()
      // 初始化轮播图
      this._initSlider()
      if (this.autoPlay) {
        this._play()
      }
    }, 20)
    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      this._setSliderWidth(true)
      this.slider.refresh()
    })
  },
  destroyed () {
    clearTimeout(this.timer)
  },
  methods: {
    // 设置slider宽度
    _setSliderWidth (isResize) {
      // 获取sliderGroup的所有子元素
      this.children = this.$refs.sliderGroup.children
      let width = 0
      // 获取父容器slider的宽度
      let sliderWidth = this.$refs.slider.clientWidth
      // 遍历循环计算 所有轮播图片的宽度
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        // 给每一个轮播图盒子 添加新类名
        addClass(child, 'slider-item')
        // 每张轮播图片的宽度 === 父容器的宽度
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      // 如果this.loop = true, 前后会各加一张图片, 那么width, 也要加两张图片的宽度
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    // 初始化slider
    _initSlider () {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        // snap: true, // 这个配置是为了做 Slide 组件用的，默认为 false，如果开启则需要配置一个 Object
        // snapLoop: this.loop, // false 是否可以无缝循环轮播
        // snapThreshold: 0.3, // 用手指滑动页面可切换的阈值, 大于这个阈值可以滑动到下一页
        // snapSpeed: 400, // 轮播图切换的动画时间
        // better-scroll新版本要求
        snap: {
          loop: this.loop, // 循环
          threshold: 0.3,
          speed: 400 // 轮播间隔
        },
        click: true
      })
      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX
        // old, 直接注释
        // if (this.loop) {
        //   pageIndex -= 1
        // }
        this.currentPageIndex = pageIndex
        if (this.autoPlay) {
          clearTimeout(this.timer)
          this._play()
        }
      })
    },
    // 初始化小点点
    _initDots () {
      this.dots = new Array(this.children.length)
    },
    _play () {
      // let pageIndex = this.currentPageIndex + 1
      // old-version 直接注释掉
      // if (this.loop) {
      //   pageIndex += 1
      // }
      // this.timer = setTimeout(() => {
      //   this.slider.goToPage(pageIndex, 1, 400)
      // }, this.interval)

      // new-version
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.slider.next() // 下一个
      }, this.interval)
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
.slider
  min-height 1px
  .slider-group
    position relative
    overflow hidden
    white-space nowrap
    .slider-item
      float left
      box-sizing border-box
      overflow hidden
      text-align center
      a
        display block
        width 100%
        overflow hidden
          text-decoration: none
      img
        display block
        width 100%
  .dots
    position absolute
    right 0
    left 0
    bottom 12px
    text-align center
    font-size 0
    .dot
      display inline-block
      margin 0 4px
      width 8px
      height 8px
      border-radius 50%
      background: $color-text-l
      &.active
        width 20px
        border-radius: 5px
        background: $color-text-ll
</style>