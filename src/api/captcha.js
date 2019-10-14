import request from '@/utils/request'

export function getCaptcha (param) {
  return process.env.BASE_API + '/kaptcha/get?sj=' + param
}

export function verifyCatcha (param) {
  return request({
    url: '/kaptcha/verify',
    method: 'post',
    data: {
      'verifyCode': param
    }
  })
}
