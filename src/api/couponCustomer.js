import request from '@/utils/request'

export function fetchCouponCustomerList (data) {
  return request({
    url: '/couponCustomer/page',
    method: 'post',
    data: data
  })
}
