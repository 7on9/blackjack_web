/* eslint-disable no-case-declarations */
import GAME_TYPES from './types'
const initialState = {
  players: [],
  idQuestion: -1,
  correct: 0,
  endGame: true,
  inGame: false,
}

export const gameReducer = (state = initialState,/*  { type, payload } */) => {
  return state
  // switch (type) {
  //   case GAME_TYPES.GAME.START:
  //   case GAME_TYPES.GAME.TIMEOUT:
  //   case GAME_TYPES.GAME.JOIN:
  //   case GAME_TYPES.GAME.CORRECT_ANSWER:
  //   case GAME_TYPES.GAME.BEGIN:
  //   case GAME_TYPES.GAME.ANSWER:
  //   case GAME_TYPES.GAME.SCOREBOARD:
  //   case GAME_TYPES.GAME.NEW_QUESTION:
  //     return {
  //       ...state,
  //       ...payload,
  //     }
  //   case GAME_TYPES.GAME.RESET_STATUS:
  //     return {
  //       ...state,
  //       result: false,
  //     }
  //   case GAME_TYPES.GAME.END: 
  //     return {
  //       ...state,
  //       ...payload,
  //       idQuestion: -1,
  //       correct: 0,
  //       endGame: true,
  //       inGame: false,
  //     }
  //   case GAME_TYPES.GAME.NEW_PLAYER:
  //     const { players } = state
  //     players.push(payload.player)
  //     return {
  //       ...state,
  //       players,
  //     }
  //   case GAME_TYPES.GAME.NEXT_QUESTION:
  //     return {
  //       ...state,
  //       idQuestion: state.idQuestion + 1,
  //     }
  //   default:
  //     return state
  // }
}
