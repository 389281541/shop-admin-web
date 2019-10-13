import request from '@/utils/request'

export function getCaptcha (params) {
  return request({
    url: '/kaptcha/get',
    method: 'get',
    params: params
  })
}

export function verifyCatcha (data) {
  return request({
    url: '/kaptcha/verify',
    method: 'post',
    data: data
  })
}
