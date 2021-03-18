import { combineReducers } from 'redux'
import {
  SELECT_SERVER, INVALIDATE_EOLS,
  REQUEST_EOLS, RECEIVE_EOLS,
  INVALIDATE_SERVERSOFTWARE, REQUEST_SERVERSOFTWARE, 
  RECEIVE_SERVERSOFTWARE
} from '../actions'

//Will add better comments when I actually start to understand what is going on in here
//At least it works
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

const serverSoftware = (state = {
  serverSoftwareIsFetching: false,
  serverSoftwareDidInvalidate: false,
  serverSoftwareItems: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_SERVERSOFTWARE:
      return {
        ...state,
        serverSoftwareDidInvalidate: true
      }
    case REQUEST_SERVERSOFTWARE:
      return {
        ...state,
        serverSoftwareIsFetching: true,
        serverSoftwareDidInvalidate: false
      }
    case RECEIVE_SERVERSOFTWARE:
      return {
        ...state,
        serverSoftwareIsFetching: false,
        serverSoftwareDidInvalidate: false,
        serverSoftwareItems: action.serverSoftware,
        serverSoftwareLastUpdated: action.serverSoftwareReceivedAt
      }
    default:
      return state
  }
}

const serverSoftwareByServername = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_SERVERSOFTWARE:
    case RECEIVE_SERVERSOFTWARE:
    case REQUEST_SERVERSOFTWARE:
      return {
        ...state,
        [action.servername]: serverSoftware(state[action.servername], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  eolsByServername,
  selectedServername,
  serverSoftwareByServername
})

export default rootReducer