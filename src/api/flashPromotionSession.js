import request from '@/utils/request'

export function fetchFlashPromotionSessionList (data) {
  return request({
    url: '/flashPromotionSession/list',
    method: 'post',
    data: data
  })
}

export function fetchAvailableList (data) {
  return request({
    url: '/flashPromotionSession/listAvailable',
    method: 'post',
    data: data
  })
}

export function createFlashPromotionSession (data) {
  return request({
    url: '/flashPromotionSession/add',
    method: 'post',
    data: data
  })
}

export function updateFlashPromotionSession (data) {
  return request({
    url: '/flashPromotionSession/update',
    method: 'post',
    data: data
  })
}

export function updateStatus (data) {
  return request({
    url: '/flashPromotionSession/updateStatus',
    method: 'post',
    data: data
  })
}

export function getFlashPromotionSession (id) {
  return request({
    url: '/flashPromotionSession/detail',
    method: 'post',
    data: {
      id: id
    }
  })
}

export function deleteFlashPromotionSession (id) {
  return request({
    url: '/flashPromotionSession/remove',
    method: 'post',
    data: {
      id: id
    }
  })
}
