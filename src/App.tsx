import React, { FC, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Card } from './components'
import { ICard } from './@types'

const App = () => {
  const [flip, setFlip] = useState(false)
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
  const PlayerPosition: FC<{ cards?: ICard[]; isThisPlayer?: boolean }> = ({
    cards,
    isThisPlayer = false,
  }) => {
    return (
      <div className="d-flex w-100 h-100" style={{ flexDirection: 'column' }}>
        <div className="d-flex" style={{ flex: 2 }}>
          <Card
            card={{ value: 'A', kind: 'spade' }}
            containerStyle={{
              width: window.innerWidth / 4 / 5 - 9,
              height: (window.innerWidth / 4 / 5 - 9) * 1.4,
              margin: 4,
              padding: 0,
            }}
            cardContentStyle={{ padding: '0.1rem' }}
          />
          <Card
            placeHolder={true}
            containerStyle={{
              width: window.innerWidth / 4 / 5 - 9,
              height: (window.innerWidth / 4 / 5 - 9) * 1.4,
              margin: 4,
              padding: 0,
            }}
            cardContentStyle={{ padding: '0.1rem' }}
          />
          <Card
            card={{ value: 3, kind: 'diamond' }}
            containerStyle={{
              width: window.innerWidth / 4 / 5 - 9,
              height: (window.innerWidth / 4 / 5 - 9) * 1.4,
              margin: 4,
              padding: 0,
            }}
            cardContentStyle={{ padding: '0.1rem' }}
          />
          <Card
            card={{ value: 4, kind: 'club' }}
            containerStyle={{
              width: window.innerWidth / 4 / 5 - 9,
              height: (window.innerWidth / 4 / 5 - 9) * 1.4,
              margin: 4,
              padding: 0,
            }}
            cardContentStyle={{ padding: '0.1rem' }}
          />
          <Card
            card={{ value: 'K', kind: 'diamond' }}
            containerStyle={{
              width: window.innerWidth / 4 / 5 - 9,
              height: (window.innerWidth / 4 / 5 - 9) * 1.4,
              margin: 4,
              padding: 0,
            }}
            cardContentStyle={{ padding: '0.1rem' }}
          />
        </div>
        <div className="d-flex" style={{ flex: 1, flexDirection: 'row' }}>
          <div style={{ flex: 1 }}>Chos Chinh</div>

          {isThisPlayer ? (
            <PlayingButtons />
          ) : null}
        </div>
      </div>
    )
  }

  return (
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
          <th className="w-25p" />
          <th className="w-25p" />
          <th className="w-25p" />
          <th className="w-25p" />
        </thead>
        <tbody>
          <tr>
            <td>
              <PlayerPosition />
            </td>
            <td>
              <PlayerPosition />
            </td>
            <td>
              <PlayerPosition />
            </td>
            <td>
              <PlayerPosition />
            </td>
          </tr>
          <tr>
            <td>
              <PlayerPosition />
            </td>
            <td colSpan={2} rowSpan={2} style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'relative',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  paddingTop: 8,
                }}>
                Người chơi: "SSSS" đang bốc bài
              </div>
              <div className="d-flex" style={{ flex: 2, position: 'relative', left: '50%', transform: 'translateX(-25%)', marginTop: 50 }}>
                <Card
                  card={{ value: 'A', kind: 'spade' }}
                  containerStyle={{
                    width: window.innerWidth / 4 / 5 - 9,
                    height: (window.innerWidth / 4 / 5 - 9) * 1.4,
                    margin: 4,
                    padding: 0,
                  }}
                  cardContentStyle={{ padding: '0.1rem' }}
                />
                <Card
                  card={{ value: 2, kind: 'heart' }}
                  containerStyle={{
                    width: window.innerWidth / 4 / 5 - 9,
                    height: (window.innerWidth / 4 / 5 - 9) * 1.4,
                    margin: 4,
                    padding: 0,
                  }}
                  cardContentStyle={{ padding: '0.1rem' }}
                />
                <Card
                  card={{ value: 3, kind: 'diamond' }}
                  containerStyle={{
                    width: window.innerWidth / 4 / 5 - 9,
                    height: (window.innerWidth / 4 / 5 - 9) * 1.4,
                    margin: 4,
                    padding: 0,
                  }}
                  cardContentStyle={{ padding: '0.1rem' }}
                />
                <Card
                  card={{ value: 4, kind: 'club' }}
                  containerStyle={{
                    width: window.innerWidth / 4 / 5 - 9,
                    height: (window.innerWidth / 4 / 5 - 9) * 1.4,
                    margin: 4,
                    padding: 0,
                  }}
                  cardContentStyle={{ padding: '0.1rem' }}
                />
                <Card
                  card={{ value: 'K', kind: 'diamond' }}
                  containerStyle={{
                    width: window.innerWidth / 4 / 5 - 9,
                    height: (window.innerWidth / 4 / 5 - 9) * 1.4,
                    margin: 4,
                    padding: 0,
                  }}
                  cardContentStyle={{ padding: '0.1rem' }}
                />
              </div>
              <div
                style={{
                  width: '33.33%',
                  // backgroundColor: green;
                  height: '50%',
                  position: 'relative',
                  left: '50%',
                  transform: 'translateX(-35%)',
                }}>
                <Deck />
              </div>
              <button
                style={{ position: 'absolute', top: 0, left: 0, margin: 4 }}
                type="button"
                className="btn btn-success">
                Ván mới
              </button>
              <button
                style={{ position: 'absolute', bottom: 0, left: 0, margin: 4 }}
                type="button"
                className="btn btn-success">
                Chia bài
              </button>
              <div style={{ position: 'absolute', bottom: 0, right: 0, margin: 4 }}> 
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
              <PlayerPosition isThisPlayer={true} />
            </td>
          </tr>
          <tr>
            <td>
              <PlayerPosition />
            </td>
            <td>
              <PlayerPosition />
            </td>
          </tr>
          <tr>
            <td>
              <PlayerPosition />
            </td>
            <td>
              <PlayerPosition />
            </td>
            <td>
              <PlayerPosition />
            </td>
            <td>
              <PlayerPosition />
            </td>
          </tr>
        </tbody>
      </table>
      {/* <Deck /> */}
    </div>
  )
}

export default App
