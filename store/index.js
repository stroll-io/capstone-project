import {createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import user from './user'
import userpins from './userpins';
import walks from './walks'
import activeWalk from './activeWalk'

const reducer = combineReducers({user, userpins, walks, activeWalk});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export default store;
export * from "./user";
