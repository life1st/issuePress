import {ARTICLE_TYPES as TYPES} from '../actionTypes'

const initArticleStates = {
  list: [],
  article: {}
}

export default function article(state = initArticleStates, action) {
  switch(action.type) {
    case TYPES.GET_LIST:
      return {
        ...state,
        list: [...action.payload]
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