<template>
  <div class="recommend" ref="recommend">
    <div class="recommend-content">
      <!-- 轮播图 -->
        <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
        <slider :imgData="recommends">
          <div v-for="item in recommends" :key="item.id">
            <a :href="item.linkUrl">
                <img class="needsclick" @load="loadImage" :src="item.picUrl">
            </a>
          </div>
        </slider>
      </div>
      <!-- 热门推荐 -->
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
          <li class="item"></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
// 引入自定义组件slider
import Slider from 'base/slider/slider'
import {getRecommend} from 'api/recommend'
import {ERR_OK} from 'api/config'
export default {
  components: {
    Slider
  },
  data () {
    return {
      recommends: [] // 轮播图数组
    }
  },
  created() {
    // 调用_getRecommend
    this._getRecommend()
  },
  methods: {
    _getRecommend () {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    },
    loadImage () {
      if (!this.checkloaded) {
        this.checkloaded = true
      }
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
.recommend
  position fixed
  width 100%
  top 88px
  bottom 0
  .recommend-content
    height 100%
    overflow hidden
    .slider-wrapper
      position relative
      width 100%
      overflow hidden
    .recommend-list
      .list-title
        height 65px
        line-height 65px
        text-align center
        font-size $font-size-medium
        color $color-theme
      .item
        display flex
        box-box-sizing border-box
        align-items center
        padding 0 20px 20px 20px
</style>