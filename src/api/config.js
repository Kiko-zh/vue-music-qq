// 封装一些公共的参数
export const commonParams = {
  g_tk: 5381,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
}

// 约定的jsonp的callback名字是 jsonpCallback
export const options = {
  param: 'jsonpCallback'
}

// 约定返回数据成功的status code 为ERR_OK = 0
export const ERR_OK = 0