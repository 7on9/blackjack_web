/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import io from 'socket.io-client'
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

  //   socket.on(GAME.TIMEOUT, () => {
  //     return dispatch({
  //       type: GAME.BEGIN,
  //       payload: {
  //         timeout: true,
  //         newQuestion: false,
  //         result: true,
  //         running: false,
  //       },
  //     })
  //   })

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

  //   socket.on(GAME.END, (scoreBoard: any) => {
  //     console.log(scoreBoard)
  //     return dispatch({
  //       type: GAME.END,
  //       payload: {
  //         players: scoreBoard,
  //         username: '',
  //       },
  //     })
  //   })

  return socket
}

const createGame = (username: string) => {
  socket.emit(GAME.CREATE, username)
}

const joinGame = (idRoom: number, username: string) => {
  socket.emit(PLAYER.JOIN, idRoom, username)
}

const divideDeck = (idRoom: number) => {
  socket.emit(GAME.PHASE_DIVIDE_DECK, idRoom)
}

const endGame = (idGame: any) => {
  // socket.emit(GAME.END, idGame)
  return (dispatch: (arg0: { type: string; payload: {} }) => any) =>
    dispatch({
      type: GAME.END_GAME,
      payload: {},
    })
}

const timeout = (idGame: any) => {
  socket.emit(GAME.NEW_PLAYER, idGame)
}

const startGame = (idQuest: any) => {
  return (
    dispatch: (arg0: {
      type: string
      payload: {
        players: never[]
        code: any
        result: boolean
        running: boolean
        idGame: any
      }
    }) => any
  ) => {
    // // QuestService.startGame(idQuest)
    // //   .then(res => res.data)
    // //   .then(res => {
    // //     socket.emit(GAME.START, res.code, idQuest)
    // //     return dispatch({
    // //       type: GAME.START,
    // //       payload: {
    // //         players: [],
    // //         code: res.code,
    // //         result: true,
    // //         running: false,
    // //         idGame: res.idGame,
    // //       },
    // //     })
    // //   })
    //   .catch(err => console.log(err))
  }
}

const nextQuestion = (idGame: any, idQuestion: any) => {
  socket.emit(GAME.PHASE_DIVIDE_DECK, idGame, idQuestion)
  return (dispatch: (arg0: { type: string; payload: {} }) => void) => {
    dispatch({
      type: GAME.PHASE_DIVIDE_DECK,
      payload: {},
    })
  }
}

const answer = (idGame: any, idQuestion: any, answer: any) => {
  socket.emit(GAME.START, idGame, idQuestion, answer)
}
// const endGame = (idGame) => {
//   return dispatch => {
//       socket.emit(GAME.END, idGame);
//     }
// }

const resetCorrect = () => {
  return {
    type: 'dsad',
    payload: {
      correct: 0,
      result: false,
      running: false,
    },
  }
}
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
  timeout,
  startGame,
  nextQuestion,
  answer,
  // endGame,
  resetCorrect,
  resetResult,
  divideDeck,
}

export default configureSocket
