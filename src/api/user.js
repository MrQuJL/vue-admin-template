import request from '@/utils/request'

export function login(data) {
  if (process.env.NODE_ENV === 'development') {
    return request({
      url: '/user_login.json',
      method: 'get',
      baseURL: '/'
    })
  }
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  if (process.env.NODE_ENV === 'development') {
    return request({
      url: '/user_info_no_menu1_3.json',
      method: 'get',
      baseURL: '/'
    })
  }
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  if (process.env.NODE_ENV === 'development') {
    return request({
      url: '/user_logout.json',
      method: 'get',
      baseURL: '/'
    })
  }
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
