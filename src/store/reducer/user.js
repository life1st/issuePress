import {USER_TYPES as TYPES} from '../actionTypes'
const initUserState = {
  admin: {},
  login: {},
}

export default function user(state = initUserState, action) {
  switch (action.type) {
    case TYPES.GET_LOGIN_INFO:
      return {
        ...state,
        login: {...action.payload}
      }
    case TYPES.GET_ADMIN_INFO:
      return {
        ...state,
        admin: {...action.payload}
      }
    default: 
      return {
        ...state
      }
  }
}
