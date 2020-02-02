import request from '@/utils/request'

export function fetchSkuList (data) {
  return request({
    url: '/sku/list',
    method: 'post',
    data: data
  })
}

export function updateSkuList (data) {
  return request({
    url: '/sku/updateBatch',
    method: 'post',
    data: data
  })
}
