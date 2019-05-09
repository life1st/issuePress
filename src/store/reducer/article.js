import {ARTICLE_TYPES as TYPES} from '../actionTypes'

const initArticleStates = {
  list: [],
  activeLabels: [],
  labels: {},
  article: {}
}

export default function article(state = initArticleStates, action) {
  switch(action.type) {
    case TYPES.GET_LIST:
      return {
        ...state,
        labels: action.payload.labels,
        activeLabels: Object.keys(action.payload.labels).map(Number),
        list: action.payload.list
      }
    case TYPES.GET_ARTICLE:
      return {
        ...state,
        article: {...action.payload}
      }
    case TYPES.TOGGLE_LABEL:
      if (state.activeLabels.includes(action.payload.labelId)) {
        return {
          ...state,
          activeLabels: [...state.activeLabels].filter(labelId => labelId != action.payload.labelId)
        }
      } else {
        return {
          ...state,
          activeLabels: [...state.activeLabels, action.payload.labelId]
        }
      }      
    default:
      return state
  }
}