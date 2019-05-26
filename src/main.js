import 'babel-polyfill' // 编译ES6
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
// 引入样式
import 'common/stylus/index.styl'

// 使用fastclick推荐用法
fastclick.attach(document.body)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
