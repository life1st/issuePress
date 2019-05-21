import {combineReducers} from 'redux'
import user from './user'
import article from './article'
import network from './network'

export default combineReducers({
  user,
  article,
  network
})