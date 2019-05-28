// 引入jsonp
import originJSONP from 'jsonp'

// 对外暴露一个方法 叫 jsonp
/* 参数
  url: 纯净的地址. 没有/?的地址
  data: query的参数, 用来拼接到url后面去
  option: 对应原始jsopn的opts(object{param(String), timeout(Number), prefix(String), name(String)})
*/
export default function jsonp (url, data, option) {
  // url可能会有?, 所以需要先判断url是否有?,
  // indexOf('?') < 0表示没有?, 就让url += ? + param(data)
  // 如果indexOf('?') > 0 表示有?, 就让url += & + param(data)
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  // 返回一个promise对象
  /* Promise的参数
    resolve: 代表promise成功, 调用的函数
    reject: 代表promise失败, 调用的函数
   */
  return new Promise((resolve, reject) => {
    // 调用import的jsonp
    /* jsonp的参数
      url:
      option:
      参数3: 回调函数, 有两个参数
        err: !err表示成功, 用resolve传入参数data, 否则就把err传入reject
        data:
    */
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

// 定义一个函数param, 传入参数data, 处理data拼接到url上去
export function param (data) {
  let url = ''
  // 遍历data
  for (var k in data) {
    // 当data[k]取出来的值是undefined, 就让data[k] = '', 否则就是取到data[k]的值
    let value = data[k] !== undefined ? data[k] : ''
    // 使用es6的模板字符串语法, 拼接url
    // encodeURIComponent() 函数可把字符串作为 URI 组件进行编码
    url += `&${k}=${encodeURIComponent(value)}`
  }
  // 把url传出去, 但是要把第一个&符号去掉, 如果没有data, 就返回''
  return url ? url.substring(1) : ''
}