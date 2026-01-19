import request from '@/utils/request'

export function getTreeList(params) {
  if (process.env.NODE_ENV === 'development') {
    return request({
      url: '/tree.json',
      method: 'get',
      baseURL: '/'
    })
  }
  return request({
    url: '/tree/list',
    method: 'get',
    params
  })
}
