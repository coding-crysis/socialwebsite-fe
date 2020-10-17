import request from '../utils/request'

export const getUsersList = (params) => {
  return request({
    url: 'users',
    method: 'get',
    params
  })
}

export const getFriendList = (id) => {
  return request({
    url: `users/${id}/friends`,
    method: 'get'
  })
}
