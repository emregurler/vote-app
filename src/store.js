import { combineReducers } from 'redux'
import linkReducer from './redux/reducers'

export const combinedReducers = combineReducers({ linkReducer })
