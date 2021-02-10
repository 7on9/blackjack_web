/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import io from 'socket.io-client'
import { TPlayerType } from '../../@types'
import { SOCKET_URL } from '../../common/connection'
import { APP_CONSTANTS } from '../../common/constants'
import { GAME, PLAYER, STATUS } from '../../constants'
import { IPlayer, IRoom } from './reducer'

const socket = io.io(SOCKET_URL)

interface IResponse {
  status: 'ERROR' | 'SUCCESS'
  code: number
  data?: any
  message?: string
}

const configureSocket = (dispatch: any) => {
  socket.on('connect', () => {
    console.log('connected to server')
  })

  socket.on(
    GAME.CREATE,
    (response: IResponse & { data?: { idRoom: number; room: IRoom } }) => {
      if (response.status === 'SUCCESS') {
        return dispatch({
          type: GAME.CREATE,
          payload: {
            room: response.data?.room,
            idRoom: response.data.idRoom,
            thisPlayer: response.data.room.host,
          },
        })
      }
    }
  )

  socket.on(PLAYER.DRAW_CARD, (response: IResponse & { data?: { thisPlayer: IPlayer } }) => {
    return dispatch({
      type: PLAYER.DRAW_CARD,
      payload: {
        thisPlayer: response.data.thisPlayer
      },
    })
  })

  socket.on(GAME.START, (response: IResponse & { data?: { thisPlayer: IPlayer } }) => {
    return dispatch({
      type: GAME.START,
      payload: {
        ...response.data
      },
    })
  })

  socket.on(
    PLAYER.JOIN,
    (response: IResponse & { data?: { idRoom: number; room: IRoom } }) => {
      if (response.status === 'SUCCESS') {
        return dispatch({
          type: PLAYER.JOIN,
          payload: {
            ...response.data,
          },
        })
      } else {
        return dispatch({
          type: PLAYER.JOIN,
          payload: {
            message: response.message,
          },
        })
      }
    }
  )

  socket.on(GAME.NEW_PLAYER, (response: IResponse) => {
    return dispatch({
      type: GAME.NEW_PLAYER,
      payload: {
        ...response.data,
      },
    })
  })
  
  socket.on(PLAYER.HOLD, (response: IResponse) => {
    return dispatch({
      type: PLAYER.HOLD,
      payload: {
        ...response.data,
      },
    })
  })
  
  socket.on(PLAYER.SHOW_HAND, (response: IResponse) => {
    return dispatch({
      type: PLAYER.SHOW_HAND,
      payload: {
        ...response.data,
      },
    })
  })

  socket.on(PLAYER.SHUFFLE_DECK, (response: IResponse) => {
    return dispatch({
      type: PLAYER.SHUFFLE_DECK,
      payload: {
        ...response.data,
      },
    })
  })

  //   socket.on(GAME.NEW_QUESTION, (idQuestion: any) => {
  //     return dispatch({
  //       type: GAME.NEW_QUESTION,
  //       payload: {
  //         idQuestion,
  //         newQuestion: true,
  //         endGame: false,
  //         timeout: false,
  //         correct: 0,
  //         result: true,
  //         running: false,
  //       },
  //     })
  //   })

  //   socket.on(GAME.ANSWER, (scoreBoard: any) => {
  //     return dispatch({
  //       type: GAME.ANSWER,
  //       payload: {
  //         players: scoreBoard,
  //         result: true,
  //         running: false,
  //       },
  //     })
  //   })

  //   socket.on(GAME.CORRECT_ANSWER, (res: any) => {
  //     return dispatch({
  //       type: GAME.CORRECT_ANSWER,
  //       payload: {
  //         correct: res ? 1 : -1,
  //         result: false,
  //         running: false,
  //       },
  //     })
  //   })

  socket.on(GAME.END_GAME, (response: IResponse) => {
    return dispatch({
      type: GAME.END_GAME,
      payload: {
        ...response.data
      },
    })
  })

  return socket
}

const createGame = (username: string) => {
  socket.emit(GAME.CREATE, username)
}

const joinGame = (idRoom: number, username: string) => {
  socket.emit(PLAYER.JOIN, idRoom, username)
}

const shuffleDeck = (idRoom: number, username: string) => {
  socket.emit(PLAYER.SHUFFLE_DECK, idRoom, username)
}

const divideDeck = (idRoom: number) => {
  socket.emit(GAME.PHASE_DIVIDE_DECK, idRoom)
}

const drawCard = (idRoom: number, username: string) => {
  socket.emit(PLAYER.DRAW_CARD, idRoom, username)
}

const hold = (idRoom: number, username: string) => {
  socket.emit(PLAYER.HOLD, idRoom, username)
}

const showHand = (idRoom: number, username: string, role: TPlayerType) => {
  socket.emit(PLAYER.SHOW_HAND, idRoom, username, role)
}

const endGame = (idRoom: number, username: string) => {
  socket.emit(GAME.END_GAME, idRoom, username)
}

// const endGame = (idGame) => {
//   return dispatch => {
//       socket.emit(GAME.END, idGame);
//     }
// }

const resetResult = () => {
  return {
    type: STATUS.LOSE,
    payload: {
      result: false,
      running: false,
    },
  }
}

export const GAME_ACTIONS = {
  createGame,
  joinGame,
  endGame,
  hold,
  resetResult,
  divideDeck,
  shuffleDeck,
  drawCard,
  showHand,
}

export default configureSocket
