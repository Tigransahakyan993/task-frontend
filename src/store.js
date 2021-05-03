import {applyMiddleware, createStore} from "redux";
import reducer from './reducer/index';
import thunk from "redux-thunk";
import logger from 'redux-logger';

const initialState = {};

export default createStore(reducer, initialState, applyMiddleware(thunk, logger));