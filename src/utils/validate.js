export function isvalidUsername (str) {
  const validMap = ['admin', 'test']
  return validMap.indexOf(str.trim()) >= 0
}

// 合法uri
export function validateURL (textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

// 小写字母
export function validateLowerCase (str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

// 大写字母
export function validateUpperCase (str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

// 大小写字母
export function validatAlphabets (str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

export function validatePhone (rule, value, callback) {
  const reg = /^[1][3,4,5,7,8][0-9]{9}$/
  if (value === '' || value === undefined || value === null) {
    callback(new Error('手机号不能为空'))
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('请输入正确的电话号码'))
    } else {
      callback()
    }
  }
}

export function validateIdNo (rule, value, callback) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (value === '' || value === undefined || value === null) {
    callback(new Error('身份证号不能为空'))
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('请输入正确的身份证号码'))
    } else {
      callback()
    }
  }
}
