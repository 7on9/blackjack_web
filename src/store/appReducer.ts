import { combineReducers } from 'redux'
// import { authReducer as user } from './auth/reducer'
import { gameReducer as game, IGameState } from './socket/reducer'

export interface IGlobalState {
  game: IGameState
}

const rootReducer = combineReducers({
  // user,
  game,
})

export default (state: any, action: any) => {
  return rootReducer(state, action)
}
