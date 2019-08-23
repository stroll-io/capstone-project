import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import userpins from './userpins';
import walks from './walks';
import activeWalk from './activeWalk';
import allPastWalks from './pastWalks';
import starredWalks from './starredWalks';
import loggedInUser from './user';
import attractions from './attractions'

const reducer = combineReducers({
  user,
  userpins,
  allPastWalks,
  starredWalks,
  loggedInUser,
  walks,
  activeWalk,
  attractions,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware)
);

const store = createStore(reducer, middleware);

export default store;
export * from './user';
