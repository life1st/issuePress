import {getUser} from '../utils/request/user'
import {getArticleList, getArticle} from '../utils/request/article'
import {
  NET_TYPES,
  USER_TYPES,
  ARTICLE_TYPES
} from './actionTypes'
import {mergeLabels} from './helper'
import {BLOG_CONFIG} from '../../config'
import { async } from 'q';

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
      const labels = data.reduce((counter, currentVal) => {
        counter = mergeLabels(counter, currentVal.labels)

        return counter
      }, {})


      dispatch({
        type: ARTICLE_TYPES.GET_LIST,
        payload: {
          labels,
          list: data
        }
      })
    } else {
      dispatch({
        type: NET_TYPES.FAILED
      })
    }
  }
}

export function fetchArticle(issue_number) {
  return async dispatch => {
    const res = await getArticle(issue_number)

    if (res.status === 200) {
      const {data} = res
      dispatch({
        type: ARTICLE_TYPES.GET_ARTICLE,
        payload: data
      })
    } else {
      dispatch({
        type: NET_TYPES.FAILED
      })
    }
  }
}