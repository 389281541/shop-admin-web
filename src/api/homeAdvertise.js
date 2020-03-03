import request from '@/utils/request'

export function fetchHomeAdvertiseList (data) {
  return request({
    url: '/homeAdvertise/listByType',
    method: 'post',
    data: data
  })
}

export function createHomeAdvertise (data) {
  return request({
    url: '/homeAdvertise/add',
    method: 'post',
    data: data
  })
}

export function updateHomeAdvertise (data) {
  return request({
    url: '/homeAdvertise/update',
    method: 'post',
    data: data
  })
}

export function getHomeAdvertise (id) {
  return request({
    url: '/homeAdvertise/detail',
    method: 'post',
    data: {
      id: id
    }
  })
}

export function removeHomeAdvertise (id) {
  return request({
    url: '/homeAdvertise/remove',
    method: 'post',
    data: {
      id: id
    }
  })
}
