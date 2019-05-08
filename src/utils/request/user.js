import {GET} from './index'

export function getUser(username) {
  const url = username ? `/users/${username}` : '/user'

  return GET(url)
}