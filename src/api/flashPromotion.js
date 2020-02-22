import request from '@/utils/request'

export function fetchFlashPromotionList (data) {
  return request({
    url: '/flashPromotion/page',
    method: 'post',
    data: data
  })
}

export function createFlashPromotion (data) {
  return request({
    url: '/flashPromotion/add',
    method: 'post',
    data: data
  })
}

export function updateFlashPromotion (data) {
  return request({
    url: '/flashPromotion/update',
    method: 'post',
    data: data
  })
}

export function updateStatus (data) {
  return request({
    url: '/flashPromotion/updateStatus',
    method: 'post',
    data: data
  })
}

export function getFlashPromotion (id) {
  return request({
    url: '/flashPromotion/detail',
    method: 'post',
    data: {
      id: id
    }
  })
}

export function deleteFlashPromotion (id) {
  return request({
    url: '/flashPromotion/remove',
    method: 'post',
    data: {
      id: id
    }
  })
}
