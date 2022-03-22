import { combineReducers } from 'redux'
import inReducer from './increment'

const reducers = {
  inReducer,
}

const rootReducer = combineReducers(reducers)

export default rootReducer