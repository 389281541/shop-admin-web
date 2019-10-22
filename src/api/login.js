import request from '@/utils/request'

export function login (userName, passWord) {
  return request({
    url: '/administrator/login',
    method: 'post',
    data: {
      userName,
      passWord
    }
  })
}
