import request from '@/utils/request'

export function fetchList (data) {
  return request({
    url: '/item/page',
    method: 'post',
    data: data
  })
}

export function createItem (data) {
  return request({
    url: '/item/add',
    method: 'post',
    data: data
  })
}

export function updateItem (data) {
  return request({
    url: '/item/update',
    method: 'post',
    data: data
  })
}

export function getItem (id) {
  return request({
    url: '/item/detail',
    method: 'post',
    data: {
      id: id
    }
  })
}

export function deleteItem (id) {
  return request({
    url: '/item/remove',
    method: 'post',
    data: {
      id: id
    }
  })
}
