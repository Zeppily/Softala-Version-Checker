export const REQUEST_EOLS = 'REQUEST_EOLS'
export const RECEIVE_EOLS = 'RECEIVE_EOLS'
export const SELECT_SERVER = 'SELECT_SERVER'
export const INVALIDATE_EOLS = 'INVALIDATE_EOLS'

export const selectServername = servername => ({
  type: SELECT_SERVER,
  servername
})

export const invalidateEols = servername => ({
  type: INVALIDATE_EOLS,
  servername
})

export const requestEols = servername => ({
  type: REQUEST_EOLS,
  servername
})

export const receiveEols = (servername, json) => ({
  type: RECEIVE_EOLS,
  servername,
  eols: json,
  receivedAt: Date.now()
})

const fetchEols = servername => dispatch => {
  console.log(servername)
  dispatch(requestEols(servername))
  return fetch(`http://localhost:8080/info/${servername}`)
    .then(response => response.json())
    //.then(json => console.log(json))
    .then(json => dispatch(receiveEols(servername, json)))
    .catch((error) => console.error(error))
}

const shouldFetchEols = (state, servername) => {
  const eols = state.eolsByServername[servername]
  if (!eols) {
    return true
  }
  if (eols.isFetching) {
    return false
  }
  return eols.didInvalidate
}

export const fetchEolsIfNeeded = servername => (dispatch, getState) => {
  if (shouldFetchEols(getState(), servername)) {
    return dispatch(fetchEols(servername))
  }
}