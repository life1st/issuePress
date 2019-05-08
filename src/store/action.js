import {getUser} from '../utils/request/user'
import {getArticleList} from '../utils/request/article'
import {
  NET_TYPES,
  USER_TYPES,
} from './actionTypes'
import {BLOG_CONFIG} from '../../config'

export function getLoginUserInfo() {
  return async dispatch => {
    const res = await getUser()

    if (res.status === 200) {
      const {data} = res
      dispatch({
        type: USER_TYPES.GET_LOGIN_INFO,
        payload: data
      })
    } else {
      dispatch({
        type: NET_TYPES.FAILED
      })
    }
  }
}

export function getAdminUserInfo() {
  return async dispatch => {
    const res = await getUser(BLOG_CONFIG.username)

    if (res.status === 200) {
      const {data} = res
      dispatch({
        type: USER_TYPES.GET_ADMIN_INFO,
        payload: data
      })
    } else {
      dispatch({
        type: NET_TYPES.FAILED
      })
    }
  }
}

export function fetchArticleList() {
  return async dispatch => {
    const res = await getArticleList()

    if (res.status === 200) {
      const {data} = res
    }
  }
}