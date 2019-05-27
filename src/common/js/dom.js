// 判断el元素是否有输入的类名 className
export function hasClass(el, className) {
  // 使用正则匹配
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

// 给DOM元素 添加新类名className
export function addClass(el, className) {
  // 判断是否有新类名className
  if (hasClass(el, className)) {
    return
  }
  // 没有className, 则把className添加到el元素的class集合中去
  // 通过el.className取到el所有的class类名, 再使用' 'split成数组
  let newClass = el.className.split(' ')
  // 把新类名className推到数组中去
  newClass.push(className)
  // 重新整合el的className
  el.className = newClass.join(' ')
}