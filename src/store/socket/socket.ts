/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import io from 'socket.io-client'
import GAME_TYPES from './types'
import { SOCKET_URL } from '../../common/connection'
import { QuestService } from '../../services/quest'
import { APP_CONSTANTS } from '../../common/constants'

const socket = io.io(SOCKET_URL)

const GAME = GAME_TYPES.GAME
const STATUS = GAME_TYPES.STATUS

const configureSocket = (dispatch: any) => {
  socket.on('connect', () => {
    console.log('connected to server')
  })

  socket.on(GAME.START, (status: any, questions: any) => {
    if (status === STATUS.SUCCESS)
      return dispatch({
        type: GAME.START,
        payload: {
          result: true,
          running: false,
          questions,
        },
      })
  })

  socket.on(GAME.JOIN, (status: any, username: any, idGame: any) => {
    console.log(status, username, idGame)
    if (status) {
      return dispatch({
        type: GAME.JOIN,
        payload: {
          result: true,
          running: false,
          username,
          idGame,
        },
      })
    } else {
      return dispatch({
        type: GAME.JOIN,
        payload: {
          code: '',
          inGame: true,
          endGame: false,
          result: false,
          running: false,
        },
      })
    }
  })

  socket.on(GAME.NEW_PLAYER, (player: { player: any }) => {
    return dispatch({
      type: GAME.NEW_PLAYER,
      payload: {
        player: player.player,
        result: false,
        running: false,
      },
    })
  })

  socket.on(GAME.TIMEOUT, () => {
    return dispatch({
      type: GAME.BEGIN,
      payload: {
        timeout: true,
        newQuestion: false,
        result: true,
        running: false,
      },
    })
  })

  socket.on(GAME.NEW_QUESTION, (idQuestion: any) => {
    return dispatch({
      type: GAME.NEW_QUESTION,
      payload: {
        idQuestion,
        newQuestion: true,
        endGame: false,
        timeout: false,
        correct: 0,
        result: true,
        running: false,
      },
    })
  })

  socket.on(GAME.ANSWER, (scoreBoard: any) => {
    return dispatch({
      type: GAME.ANSWER,
      payload: {
        players: scoreBoard,
        result: true,
        running: false,
      },
    })
  })

  socket.on(GAME.CORRECT_ANSWER, (res: any) => {
    return dispatch({
      type: GAME.CORRECT_ANSWER,
      payload: {
        correct: res ? 1 : -1,
        result: false,
        running: false,
      },
    })
  })

  socket.on(GAME.END, (scoreBoard: any) => {
    console.log(scoreBoard)
    return dispatch({
      type: GAME.END,
      payload: {
        players: scoreBoard,
        username: '',
      },
    })
  })

  return socket
}

export const joinGame = (code: any, username: any) => {
  socket.emit(
    GAME.JOIN,
    code,
    username,
    localStorage.getItem(APP_CONSTANTS.WEB_TOKEN)
  )
}

export const endGame = (idGame: any) => {
  socket.emit(GAME.END, idGame)
  return (dispatch: (arg0: { type: string; payload: {} }) => any) => dispatch({
    type: GAME.END,
    payload: {}
  })
}

export const timeout = (idGame: any) => {
  socket.emit(GAME.TIMEOUT, idGame)
}

export const startGame = (idQuest: any) => {
  return (dispatch: (arg0: { type: string; payload: { players: never[]; code: any; result: boolean; running: boolean; idGame: any } }) => any) => {
    QuestService.startGame(idQuest)
      .then(res => res.data)
      .then(res => {
        socket.emit(GAME.START, res.code, idQuest)
        return dispatch({
          type: GAME.START,
          payload: {
            players: [],
            code: res.code,
            result: true,
            running: false,
            idGame: res.idGame,
          },
        })
      })
      .catch(err => console.log(err))
  }
}

export const nextQuestion = (idGame: any, idQuestion: any) => {
  socket.emit(GAME.NEXT_QUESTION, idGame, idQuestion)
  return (dispatch: (arg0: { type: string; payload: {} }) => void) => {
    dispatch({
      type: GAME.NEXT_QUESTION,
      payload: {},
    })
  }
}

export const answer = (idGame: any, idQuestion: any, answer: any) => {
  socket.emit(GAME.ANSWER, idGame, idQuestion, answer)
}
// export const endGame = (idGame) => {
//   return dispatch => {
//       socket.emit(GAME.END, idGame);
//     }
// }

export const resetCorrect = () => {
  return {
    type: 'dsad',
    payload: {
      correct: 0,
      result: false,
      running: false,
    },
  }
}
export const resetResult = () => {
  return {
    type: STATUS.RESET,
    payload: {
      result: false,
      running: false,
    },
  }
}

export default configureSocket
