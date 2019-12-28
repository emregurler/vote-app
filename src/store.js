import { combineReducers } from 'redux'
import linkReducer from './redux/reducer'

export const combinedReducers = combineReducers({ linkReducer })
