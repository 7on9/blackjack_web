import { AuthenticationService } from '../../services/authentication'
import { USER_TYPE, EVENT, ERROR } from './types'
import { APP_CONSTANTS } from '../../common/constants'

const authenAction = (type, token, email, result) => {
  return {
    type,
    payload: { result, token, email },
  }
}

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      let res = await AuthenticationService.login(email, password)
      res = res.data
      localStorage.setItem(APP_CONSTANTS.WEB_TOKEN, res.token)
      return dispatch({
        type: USER_TYPE.AUTH.LOGIN,
        payload: {
          result: true,
          info: res.info,
          authenticated: true,
        },
      })
    } catch (error) {
      return dispatch({
        type: USER_TYPE.AUTH.LOGIN,
        payload: {
          result: false,
          user: null,
          token: null,
          email: null,
          authenticated: false,
        },
      })
    }
  }
}

export const resetResult = () => {
  return (dispatch) => {
    dispatch({
      type: EVENT.RESULT,
      payload: {
        result: false,
      },
    })
  }
}

export const changeStatusRunning = (status) => {
  return (dispatch) => {
    dispatch({
      type: EVENT.RUNNING,
      payload: {
        running: status,
      },
    })
  }
}

export const resetErrorUpdate = () => {
  return (dispatch) => {
    dispatch({
      type: ERROR.UPDATE,
      payload: {
        errorUpdate: undefined,
      },
    })
  }
}

export const register = (email, password, name) => {
  return async (dispatch) => {
    try {
      let res = await AuthenticationService.register(email, password, name)
      dispatch({
        type: USER_TYPE.AUTH.REGISTER,
        payload: {
          running: false,
          result: true,
          register: true,
        },
      })
    } catch (error) {
      dispatch({
        type: USER_TYPE.AUTH.REGISTER,
        payload: {
          running: false,
          result: false,
          register: false,
        },
      })
    }
  }
}

export const update = (props) => {
  return async (dispatch) => {
    try {
      const res = await AuthenticationService.update(props)
      dispatch({
        type: USER_TYPE.UPDATE,
        payload: {
          running: false,
          result: true,
          info: res.data,
          errorUpdate: false,
        },
      })
    } catch (error) {
      dispatch({
        type: USER_TYPE.UPDATE,
        payload: {
          running: false,
          result: false,
          errorUpdate: true,
        },
      })
    }
  }
}

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem(APP_CONSTANTS.WEB_TOKEN)
    localStorage.removeItem(APP_CONSTANTS.WEB_EMAIL)
    dispatch({
      type: USER_TYPE.AUTH.LOGOUT,
      payload: {},
    })
  }
}

export const verify = () => {
  return async (dispatch) => {
    try {
      let res = await AuthenticationService.verify()
      res = res.data
      localStorage.setItem(APP_CONSTANTS.WEB_EMAIL, res.info.email)
      localStorage.setItem(APP_CONSTANTS.WEB_TOKEN, res.token)
      dispatch({
        type: USER_TYPE.AUTH.VERIFY,
        payload: {
          info: res.info,
          token: res.token,
          authenticated: true,
          isVetify: true,
        },
      })
    } catch (error) {
      localStorage.removeItem(APP_CONSTANTS.WEB_USER_INFO)
      localStorage.removeItem(APP_CONSTANTS.WEB_TOKEN)
      localStorage.removeItem(APP_CONSTANTS.WEB_EMAIL)
      dispatch({
        type: USER_TYPE.AUTH.VERIFY,
        payload: {
          result: false,
          authenticated: false,
          isVetify: true,
        },
      })
    }
  }
}

export const resetToken = () => {
  return authenAction(USER_TYPE.LOGIN, null, null, false)
}
