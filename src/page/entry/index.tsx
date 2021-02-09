import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { IGlobalState } from '../../store/appReducer'
import { IGameState } from '../../store/socket/reducer'
import { GAME_ACTIONS } from '../../store/socket/socket'
import { COMMON_ACTIONS } from '../../store/socket/type'
import './style.css'

const Entry = () => {
  const [username, setUsername] = useState<string>('')
  const [idRoom, setIdRoom] = useState<string>('')
  const gameState = useSelector((state: IGlobalState) => state.game)
  const dispatch = useDispatch()

  const onCreateGame = (e: React.MouseEvent) => {
    e.preventDefault()
    if (gameState.requesting) return
    if (!username.length) {
      alert('Nhập username đi :)')
      return
    }
    dispatch({
      type: COMMON_ACTIONS.REQUEST,
      payload: null,
    })
    GAME_ACTIONS.createGame(username)
  }

  const onJoinRoom = (e: React.MouseEvent) => {
    e.preventDefault()
    if (gameState.requesting) return
    if (!username.length) {
      alert('Nhập username đi :)')
      return
    }

    if (!idRoom.length) {
      alert('Nhập mã phòng đi :)')
      return
    }
    dispatch({
      type: COMMON_ACTIONS.REQUEST,
      payload: null,
    })
    GAME_ACTIONS.joinGame(Number(idRoom), username)
  }

  return gameState.room ? (
    <Redirect to={{ pathname: '/', state: { from: '/entry' } }} />
  ) : (
    <>
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <div className="user-box">
            <input
              type="text"
              name="username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input type="text" name="password" required onChange={(e) => setIdRoom(e.target.value)} />
            <label>Room</label>
          </div>
          <div className="d-flex">
            <a href="#" onClick={onJoinRoom}>
              <span />
              <span />
              <span />
              <span />
              Đăng nhập
            </a>
            <a href="#" onClick={onCreateGame}>
              <span />
              <span />
              <span />
              <span />
              Tạo phòng
            </a>
          </div>
        </form>
      </div>
    </>
  )
}

export default Entry
