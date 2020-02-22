import request from '@/utils/request'

export function fetchFlashPromotionSpuList (data) {
  return request({
    url: '/flashPromotionSpu/page',
    method: 'post',
    data: data
  })
}

export function createFlashPromotionSpu (data) {
  return request({
    url: '/flashPromotionSpu/addBatch',
    method: 'post',
    data: data
  })
}

export function updateFlashPromotionSpu (data) {
  return request({
    url: '/flashPromotionSpu/update',
    method: 'post',
    data: data
  })
}

export function updateStatus (data) {
  return request({
    url: '/flashPromotionSpu/updateStatus',
    method: 'post',
    data: data
  })
}

export function getFlashPromotionSpu (id) {
  return request({
    url: '/flashPromotionSpu/detail',
    method: 'post',
    data: {
      id: id
    }
  })
}

export function deleteFlashPromotionSpu (id) {
  return request({
    url: '/flashPromotionSpu/remove',
    method: 'post',
    data: {
      id: id
    }
  })
}
