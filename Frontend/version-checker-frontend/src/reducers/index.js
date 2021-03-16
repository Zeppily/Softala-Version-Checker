import { combineReducers } from 'redux'
import {
  SELECT_SERVER, INVALIDATE_EOLS,
  REQUEST_EOLS, RECEIVE_EOLS
} from '../actions'

const selectedServername = (state = 'Raahe', action) => {
  switch (action.type) {
    case SELECT_SERVER:
      return action.servername
    default:
      return state
  }
}

const eols = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_EOLS:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_EOLS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_EOLS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.eols,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const eolsByServername = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_EOLS:
    case RECEIVE_EOLS:
    case REQUEST_EOLS:
      return {
        ...state,
        [action.servername]: eols(state[action.servername], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  eolsByServername,
  selectedServername
})

export default rootReducer