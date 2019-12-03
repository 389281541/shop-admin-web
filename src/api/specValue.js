import request from '@/utils/request'

export function fetchSpecValueList (data) {
  return request({
    url: '/specValue/page',
    method: 'post',
    data: data
  })
}

export function createSpecValue (data) {
  return request({
    url: '/specValue/add',
    method: 'post',
    data: data
  })
}

export function updateSpecValue (data) {
  return request({
    url: '/specValue/update',
    method: 'post',
    data: data
  })
}

export function getSpecValue (id) {
  return request({
    url: '/specValue/detail',
    method: 'post',
    data: {
      id: id
    }
  })
}

export function deleteSpecValue (id) {
  return request({
    url: '/specValue/remove',
    method: 'post',
    data: {
      id: id
    }
  })
}

export function upDownSpecValue (data) {
  return request({
    url: '/specValue/upDownRanking',
    method: 'post',
    data: data
  })
}
