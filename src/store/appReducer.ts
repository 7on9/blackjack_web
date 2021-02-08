import { combineReducers } from 'redux'
// import { authReducer as user } from './auth/reducer'
import { gameReducer as game } from './socket/reducer'

const rootReducer = combineReducers({
  // user,
  game,
})

export default (state: any, action: any) => {
  return rootReducer(state, action)
}
