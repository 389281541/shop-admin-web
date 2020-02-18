import request from '@/utils/request'

export function fetchOrderList (data) {
  return request({
    url: '/order/page',
    method: 'post',
    data: data
  })
}

export function closeOrder (data) {
  return request({
    url: '/order/close',
    method: 'post',
    data: data
  })
}

export function deliverOrder (data) {
  return request({
    url: '/order/deliver',
    method: 'post',
    data: data
  })
}

export function changeReceiverInfo (data) {
  return request({
    url: '/order/changeReceiverInfo',
    method: 'post',
    data: data
  })
}

export function changeMoneyInfo (data) {
  return request({
    url: '/order/changeMoneyInfo',
    method: 'post',
    data: data
  })
}

export function updateNote (data) {
  return request({
    url: '/order/updateNote',
    method: 'post',
    data: data
  })
}

export function getOrder (id) {
  return request({
    url: '/order/detail',
    method: 'post',
    data: {
      id: id
    }
  })
}

export function deleteOrder (ids) {
  return request({
    url: '/order/remove',
    method: 'post',
    data: {
      ids: ids
    }
  })
}
