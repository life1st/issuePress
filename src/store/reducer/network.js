import {NET_TYPES as TYPES} from '../actionTypes'
import {ToastsStore} from 'react-toasts'

const initNetworkStates = {
  info: '',
  status: null
}

export default function network(state = initNetworkStates, action) {
  let {status} = initNetworkStates
  switch (action.type) {
    case TYPES.FAILED:
      status = 'failed'
      ToastsStore.error(action.payload.info)
      break
    case TYPES.FETCHING:
      status = 'fetching'
      break
    case TYPES.SUCCESS:
      status = 'success'
      break
  }

  return {
    status,
    info: action.payload && action.payload.info || initNetworkStates.info
  }
}