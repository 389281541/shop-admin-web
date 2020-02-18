import request from '@/utils/request'

export function getOrderSetting (data) {
  return request({
    url: '/orderSetting/get',
    method: 'post',
    data: data
  })
}

export function updateOrderSetting (data) {
  return request({
    url: '/orderSetting/update',
    method: 'post',
    data: data
  })
}
