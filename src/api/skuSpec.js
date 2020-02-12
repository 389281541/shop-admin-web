import request from '@/utils/request'

export function fetchSkuSpecListBySpuId (id) {
  return request({
    url: '/skuSpec/listMemberShipBySpuId',
    method: 'post',
    data: {
      id: id
    }
  })
}
