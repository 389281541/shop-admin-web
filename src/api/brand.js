import request from '@/utils/request'

export function fetchBrandList (data) {
  return request({
    url: '/brand/page',
    method: 'post',
    data: data
  })
}

export function createBrand (data) {
  return request({
    url: '/brand/add',
    method: 'post',
    data: data
  })
}

export function updateBrand (data) {
  return request({
    url: '/brand/update',
    method: 'post',
    data: data
  })
}

export function getBrand (id) {
  return request({
    url: '/brand/detail',
    method: 'post',
    data: {
      id: id
    }
  })
}

export function deleteBrand (id) {
  return request({
    url: '/brand/remove',
    method: 'post',
    data: {
      id: id
    }
  })
}
