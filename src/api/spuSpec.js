import request from '@/utils/request'

export function fetchSpuSpecListBySpuId (id) {
  return request({
    url: '/spuSpec/listBySpuId',
    method: 'post',
    data: {
      id: id
    }
  })
}
