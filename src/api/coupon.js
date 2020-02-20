import request from '@/utils/request'

export function fetchCouponList (data) {
  return request({
    url: '/coupon/page',
    method: 'post',
    data: data
  })
}

export function createCoupon (data) {
  return request({
    url: '/coupon/add',
    method: 'post',
    data: data
  })
}

export function updateCoupon (data) {
  return request({
    url: '/coupon/update',
    method: 'post',
    data: data
  })
}

export function getCoupon (id) {
  return request({
    url: '/coupon/detail',
    method: 'post',
    data: {
      id: id
    }
  })
}

export function deleteCoupon (id) {
  return request({
    url: '/coupon/remove',
    method: 'post',
    data: {
      id: id
    }
  })
}
