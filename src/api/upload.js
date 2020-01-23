import request from '@/utils/request'
export function getToken () {
  return request({
    url: '/upload/getToken',
    method: 'get'
  })
}
