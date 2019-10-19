import request from '@/utils/request'

export function login (userName, passWord) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      userName,
      passWord
    }
  })
}
