import request from '@/utils/request'

export function fetchShopList (data) {
  return request({
    url: '/shop/page',
    method: 'post',
    data: data
  })
}

export function createShop (data) {
  return request({
    url: '/shop/add',
    method: 'post',
    data: data
  })
}

export function updateShop (data) {
  return request({
    url: '/shop/update',
    method: 'post',
    data: data
  })
}

export function getShop (id) {
  return request({
    url: '/shop/detail',
    method: 'post',
    data: {
      id: id
    }
  })
}

export function deleteShop (id) {
  return request({
    url: '/shop/remove',
    method: 'post',
    data: {
      id: id
    }
  })
}
