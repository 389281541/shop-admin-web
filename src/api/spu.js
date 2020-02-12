import request from '@/utils/request'

export function fetchSpuList (data) {
  return request({
    url: '/spu/page',
    method: 'post',
    data: data
  })
}

export function createSpu (data) {
  return request({
    url: '/spu/add',
    method: 'post',
    data: data
  })
}

export function updateSpu (data) {
  return request({
    url: '/spu/update',
    method: 'post',
    data: data
  })
}

export function getSpu (id) {
  return request({
    url: '/spu/detail',
    method: 'post',
    data: {
      id: id
    }
  })
}

export function deleteSpu (id) {
  return request({
    url: '/spu/remove',
    method: 'post',
    data: {
      id: id
    }
  })
}

export function setSaleStatus (param) {
  return request({
    url: '/spu/setSaleStatus',
    method: 'post',
    data: param
  })
}

export function setRecommendStatus (param) {
  return request({
    url: '/spu/setRecommendStatus',
    method: 'post',
    data: param
  })
}
