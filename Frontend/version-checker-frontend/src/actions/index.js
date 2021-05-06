import config from '../config.json';

export const REQUEST_EOLS = 'REQUEST_EOLS';
export const RECEIVE_EOLS = 'RECEIVE_EOLS';
export const SELECT_SERVER = 'SELECT_SERVER';
export const INVALIDATE_EOLS = 'INVALIDATE_EOLS';

export const REQUEST_SERVERSOFTWARE = 'REQUEST_SERVERSOFTWARE';
export const RECEIVE_SERVERSOFTWARE = 'RECEIVE_SERVERSOFTWARE';
export const INVALIDATE_SERVERSOFTWARE = 'INVALIDATE_SERVERSOFTWARE';

export const REQUEST_SERVERS = 'REQUEST_SERVERS';
export const RECEIVE_SERVERS = 'RECEIVE_SERVERS';
export const INVALIDATE_SERVERS = 'INVALIDATE_SERVERS';
export const SELECT_ALL_SERVERS = 'SELECT_ALL_SERVERS';

//When a project name changes both EoL and software data are changed or updated if needed
//Action for switching projects
export const selectServername = servername => ({
  type: SELECT_SERVER,
  servername
})

export const newServerAdded = allServers => ({
  type: SELECT_ALL_SERVERS,
  allServers
})

//Actions for changing and updating EOL data based on the selected project
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

//Actions for changing and updating software data based on the selected project
export const invalidateServerSoftware = servername => ({
  type: INVALIDATE_SERVERSOFTWARE,
  servername
})

export const requestServerSoftware = servername => ({
  type: REQUEST_SERVERSOFTWARE,
  servername
})

export const receiveServerSoftware = (servername, json) => ({
  type: RECEIVE_SERVERSOFTWARE,
  servername,
  serverSoftware: json,
  serverSoftwareReceivedAt: Date.now()
})

//Actions for changing and updating servers
export const invalidateServers = (allServers) => ({
  type: INVALIDATE_SERVERS,
  allServers
})

export const requestServers = (allServers) => ({
  type: REQUEST_SERVERS,
  allServers
})

export const receiveServers = (allServers, json) => ({
  type: RECEIVE_SERVERS,
  serverData: json,
  allServers,
  serversReceivedAt: Date.now()
})

//Fetch functions to get the data from backend
const fetchEols = servername => dispatch => {
  dispatch(requestEols(servername))
  return fetch(`${config.url}/api/eols/${servername}`)
    .then(response => response.json())
    .then(json => {if(json.data){
                      dispatch(receiveEols(servername, json.data))}
                    else {
                      dispatch(receiveEols(servername, json.message))}
                  })
    .catch((error) => console.error(error))
}

const fetchServerSoftware = servername => dispatch => {
  dispatch(requestServerSoftware(servername))
  return fetch(`${config.url}/api/projectsoftwares/${servername}`)
    .then(response => response.json())
    .then(json => dispatch(receiveServerSoftware(servername, json.data)))
    .catch((error) => console.error(error))
}

const fetchServers = allServers => dispatch => {
  dispatch(requestServers(allServers))
  return fetch(`${config.url}/api/projects`)
  .then(response => response.json())
  .then(json => dispatch(receiveServers(allServers, json.data)))
  .catch((error) => console.error(error))
}

//Checks if the Eol data should be updated
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

//Checks if the software data should be updated
const shouldFetchServerSoftware = (state, servername) => {
  const serverSoftware = state.serverSoftwareByServername[servername]
  if (!serverSoftware) {
    return true
  }
  if (serverSoftware.serverSoftwareIsFetching) {
    return false
  }
  return serverSoftware.serverSoftwareDidInvalidate
}

const shouldFetchServers = (state, allServers) => {
  const servers = state.serverInfo[allServers]
  if (!servers) {
    return true
  }
  if (servers.serversIsFetching) {
    return false
  }
  return servers.serversDidInvalidate
}


//Calls the fetch function if the EoL data should be updated
export const fetchEolsIfNeeded = servername => (dispatch, getState) => {
  if (shouldFetchEols(getState(), servername)) {
    return dispatch(fetchEols(servername))
  }
}

//Calls the fetch function if the software data should be updated
export const fetchServerSoftwareIfNeeded = servername => (dispatch, getState) => {
  if (shouldFetchServerSoftware(getState(), servername)) {
    return dispatch(fetchServerSoftware(servername))
  }
}

export const fetchServersIfNeeded = allServers => (dispatch, getState) => {
  if (shouldFetchServers(getState(), allServers)) {
    return dispatch(fetchServers(allServers))
  }
}