import React, { FC, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Card } from './components'
import { ICard } from './@types'
import { useDispatch, useSelector } from 'react-redux'
import { IGlobalState } from './store/appReducer'
import { Redirect } from 'react-router-dom'
import { IPlayer } from './store/socket/reducer'
import { GAME_ACTIONS } from './store/socket/socket'

const App = () => {
  const [flip, setFlip] = useState(false)
  const gameState = useSelector((state: IGlobalState) => state.game)
  const Deck = () => {
    const deck = []
    for (let index = 0; index < 52; index++) {
      deck.push(
        <Card
          key={index}
          canFlip={false}
          containerStyle={{
            position: 'absolute',
            left: index * 0.5,
            bottom: index * 0.5,
            zIndex: -index,
          }}
        />
      )
    }
    return <>{deck}</>
  }

  const PlayingButtons = () => {
    return (
      <div className="d-flex" style={{ flex: 1 }}>
        <button
          style={{ flex: 1, margin: 4 }}
          type="button"
          className="btn btn-success">
          Bốc
        </button>
        <button
          style={{ flex: 1, margin: 4 }}
          type="button"
          className="btn btn-danger">
          Dằn
        </button>
        <button
          style={{ flex: 1, margin: 4 }}
          type="button"
          className="btn btn-warning">
          Show hand
        </button>
        {/* <button
    style={{ flex: 1, margin: 4 }}
    type="button"
    className="btn btn-primary">
    Bốc
  </button> */}
      </div>
    )
  }

  const PlayerPosition: FC<{
    cards?: ICard[]
    isThisPlayer?: boolean
    player?: IPlayer
  }> = ({ cards, player, isThisPlayer = false }) => {
    isThisPlayer = player?.username == thisPlayer.username
    if (isThisPlayer) {
      cards = thisPlayer.cards
    } else {
      cards = player?.cards
    }
    return (
      <div className="d-flex w-100 h-100" style={{ flexDirection: 'column' }}>
        <div className="d-flex" style={{ flex: 2 }}>
          {[0, 1, 2, 3, 4].map((id) => (
            <Card
              key={id}
              card={cards ? cards[id] : undefined}
              canFlip={isThisPlayer}
              placeHolder={!(cards && cards[id])}
              containerStyle={{
                width: window.innerWidth / 4 / 5 - 9,
                height: (window.innerWidth / 4 / 5 - 9) * 1.4,
                margin: 4,
                padding: 0,
              }}
              cardContentStyle={{ padding: '0.1rem' }}
            />
          ))}
        </div>
        <div className="d-flex" style={{ flex: 1, flexDirection: 'row' }}>
          <div style={{ flex: 1 }}>{player?.username}</div>
          {isThisPlayer ? <PlayingButtons /> : null}
        </div>
      </div>
    )
  }

  console.log('gameState', gameState)

  const onDivideDeck = () => {
    thisPlayer.role === 'HOST' && gameState.idRoom && GAME_ACTIONS.divideDeck(gameState.idRoom)
  }

  const { thisPlayer } = gameState

  return gameState.room ? (
    <div className="App">
      <table
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
          color: 'white',
        }}>
        <thead>
          <tr>
            <th className="w-25p" />
            <th className="w-25p" />
            <th className="w-25p" />
            <th className="w-25p" />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <PlayerPosition player={gameState.room.players[0]} />
            </td>
            <td>
              <PlayerPosition player={gameState.room.players[1]} />
            </td>
            <td>
              <PlayerPosition player={gameState.room.players[2]} />
            </td>
            <td>
              <PlayerPosition player={gameState.room.players[3]} />
            </td>
          </tr>
          <tr>
            <td>
              <PlayerPosition player={gameState.room.players[11]} />
            </td>
            <td colSpan={2} rowSpan={2} style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'relative',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  paddingTop: 16,
                }}>
                Phòng: {gameState.idRoom} - Chủ xị:{' '}
                {gameState.room?.host?.username}
              </div>
              <div
                style={{
                  position: 'relative',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  paddingTop: 8,
                }}>
                {gameState.room.message}
              </div>
              <div
                className="d-flex"
                style={{
                  flex: 2,
                  position: 'relative',
                  left: '50%',
                  transform: 'translateX(-25%)',
                }}>
                {gameState.room && gameState.room.host && [0, 1, 2, 3, 4].map((id) => (
                  <Card
                    key={id}
                    card={thisPlayer.role === 'HOST' ? thisPlayer.cards[id] :
                     gameState.room?.host?.cards ? gameState.room?.host?.cards[id] : undefined}
                    canFlip={thisPlayer.role === 'HOST'}
                    placeHolder={!(gameState.room?.host?.cards && gameState.room?.host?.cards[id])}
                    containerStyle={{
                      width: window.innerWidth / 4 / 5 - 9,
                      height: (window.innerWidth / 4 / 5 - 9) * 1.4,
                      margin: 4,
                      padding: 0,
                    }}
                    cardContentStyle={{ padding: '0.1rem' }}
                  />
                ))}
              </div>
              <div
                style={{
                  width: '33.33%',
                  // backgroundColor: green;
                  height: '50%',
                  position: 'relative',
                  left: '10%',
                  transform: 'translateX(-35%)',
                }}>
                <Deck />
              </div>
              <button
                style={{ position: 'absolute', top: 0, left: 0, margin: 4 }}
                type="button"
                className="btn btn-danger">
                Ván mới
              </button>
              <button
                onClick={onDivideDeck}
                style={{ position: 'absolute', bottom: 0, left: 0, margin: 4 }}
                type="button"
                {...((gameState.room.phase == 'PREPARE' || gameState.room.phase == 'WAITING_PLAYER') && thisPlayer.role === 'HOST' ? { disabled: false } : { disabled: true })}
                className="btn btn-success" >
                Chia bài
              </button>
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  margin: 4,
                }}>
                <button
                  style={{ flex: 1, margin: 4 }}
                  type="button"
                  className="btn btn-success">
                  Đổi vòng
                </button>
                <button
                  style={{ flex: 1, margin: 4 }}
                  type="button"
                  className="btn btn-success">
                  Xào bài
                </button>
                <button
                  style={{ flex: 1, margin: 4 }}
                  type="button"
                  className="btn btn-info">
                  Kinh bài
                </button>
                <PlayingButtons />
              </div>
            </td>
            <td>
              <PlayerPosition player={gameState.room.players[4]} />
            </td>
          </tr>
          <tr>
            <td>
              <PlayerPosition player={gameState.room.players[10]} />
            </td>
            <td>
              <PlayerPosition player={gameState.room.players[5]} />
            </td>
          </tr>
          <tr>
            <td>
              <PlayerPosition player={gameState.room.players[9]} />
            </td>
            <td>
              <PlayerPosition player={gameState.room.players[8]} />
            </td>
            <td>
              <PlayerPosition player={gameState.room.players[7]} />
            </td>
            <td>
              <PlayerPosition player={gameState.room.players[6]} />
            </td>
          </tr>
        </tbody>
      </table>
      {/* <Deck /> */}
    </div>
  ) : (
    <Redirect to={{ pathname: '/entry' }} />
  )
}

export default App
