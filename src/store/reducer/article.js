import {ARTICLE_TYPES as TYPES} from '../actionTypes'

const initArticleStates = {
  list: [],
  labels: {},
  article: {}
}

export default function article(state = initArticleStates, action) {
  switch(action.type) {
    case TYPES.GET_LIST:
      return {
        ...state,
        labels: action.payload.labels,
        list: action.payload.list
      }
    case TYPES.GET_ARTICLE:
      return {
        ...state,
        article: {...action.payload}
      }

    default:
      return state
  }
}