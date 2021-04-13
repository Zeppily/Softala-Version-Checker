import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ServerOverview from './components/ServerOverview';
import Navigator from './components/Navigator';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const middleware = [ thunk ]

//Creating a store for the Redux so we can access required resources from other components
const store = createStore(
  reducer, 
  applyMiddleware(...middleware)
)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <AppBar position="absolute">
        <Toolbar>
          <Typography component="h1" variant="h6" color="inherit" noWrap>
            Version checker
          </Typography>
          <Navigator/>
        </Toolbar>
      </AppBar> 
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/server_overview" component={ServerOverview} />    
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
