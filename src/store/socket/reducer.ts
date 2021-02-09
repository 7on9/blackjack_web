import { ICard, TPlayerStatus, TPlayerType } from '../../@types'
import { GAME, PLAYER } from '../../constants'
import { COMMON_ACTIONS } from './type'

/* eslint-disable no-case-declarations */

export interface IPlayer {
  cards: ICard[]
  username: string
  status: TPlayerStatus | null
  role: TPlayerType
  color: string | null
}

export interface IRoom {
  players: IPlayer[]
  host: IPlayer | null
  deck: ICard[]
}

export interface IGameState {
  players: IPlayer[],
  room: IRoom | null,
  status: TPlayerStatus | null,
  endGame: true,
  inGame: boolean,
  thisPlayer: IPlayer,
  requesting: boolean
  idRoom: number | null
}

const initialState: IGameState = {
  room: null,
  players: [],
  status: null,
  endGame: true,
  inGame: false,
  idRoom: null,
  thisPlayer: {
    username: '',
    status: null,
    role: 'PLAYER',
    cards: [],
    color: null,
  },
  requesting: false
}

export const gameReducer: (state: IGameState, action: any) => IGameState = (state = initialState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case COMMON_ACTIONS.REQUEST: 
      return {
        ...state,
        requesting: true
      }
    case GAME.CREATE: 
    case PLAYER.JOIN: 
    case GAME.NEW_PLAYER: 
      console.log('payload', action.payload)
      return {
        ...state,
        ...action.payload,
        endGame: false,
        inGame: true,
        requesting: false
      }
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
    default:
      return state
  }
}
