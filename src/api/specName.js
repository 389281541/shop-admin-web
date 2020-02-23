import request from '@/utils/request'

export function fetchSpecNameList (data) {
  return request({
    url: '/specName/page',
    method: 'post',
    data: data
  })
}

export function createSpecName (data) {
  return request({
    url: '/specName/add',
    method: 'post',
    data: data
  })
}

export function updateSpecName (data) {
  return request({
    url: '/specName/update',
    method: 'post',
    data: data
  })
}

export function getSpecName (id) {
  return request({
    url: '/specName/detail',
    method: 'post',
    data: {
      id: id
    }
  })
}

export function deleteSpecName (id) {
  return request({
    url: '/specName/remove',
    method: 'post',
    data: {
      id: id
    }
  })
}

export function fetchListByItemId (data) {
  return request({
    url: '/specName/listByItemId',
    method: 'post',
    data: data
  })
}
