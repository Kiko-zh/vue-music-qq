// 推荐模块的js
// 引入已封装的jsonp
import jsonp from 'common/js/jsonp'
// 从config.js中 按需引入 commonParams, option
import {commonParams, options} from './config'
// 封装方法getRecommend, 利用jsonp抓取数据
export function getRecommend() {
  // qq音乐图片的url
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  // 配置即将要拼接到url上的data, 使用Object.assign
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}