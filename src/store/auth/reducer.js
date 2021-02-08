//reducer user
import { USER_TYPE, EVENT, ERROR } from './types'

let initialState = {
  token: '',
  info: null,
  running: false,
  authenticated: false,
  result: false,
  register: false,
  isVetify: false,
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_TYPE.AUTH.LOGIN:
    case USER_TYPE.AUTH.VERIFY:
    case USER_TYPE.UPDATE:
      state = {
        ...state,
        ...action.payload,
        authenticated: action.payload.authenticated,
        running: false,
      }
      break
    case USER_TYPE.AUTH.LOGOUT:
      state = {
        ...state,
        ...action.payload,
        authenticated: false,
        running: false,
        info: null,
      }
      break
    case USER_TYPE.AUTH.REGISTER:
    case EVENT.RESULT:
      state = {
        ...state,
        ...action.payload,
        running: false,
      }
      break
    case EVENT.RUNNING:
      state = {
        ...state,
        running: action.payload.running,
      }
      break
    case ERROR.UPDATE:
      state = {
        ...state,
        errorUpdate: action.payload.errorUpdate,
      }
      break
    default:
      break
  }
  return state
}
