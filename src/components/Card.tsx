import React, { CSSProperties, FC, ReactNode, useState } from 'react'
import { ICard } from '../@types'

export const Card: FC<{
  containerStyle?: CSSProperties
  cardContentStyle?: CSSProperties
  children?: ReactNode
  front?: ReactNode
  back?: ReactNode
  card?: ICard
  canFlip?: boolean
  cardBack?: string
  defaultSide?: 'front' | 'back'
  placeHolder?: boolean
}> = ({
  containerStyle,
  card,
  cardContentStyle,
  canFlip = true,
  defaultSide = 'back',
  cardBack = '/images/phu.png',
  placeHolder = false
}) => {
  const [flip, setFlip] = useState(false)
  return (
    <div
      className={`card-container ${placeHolder ? 'image-background card-border card-place-holder' : ''}`}
      style={containerStyle}>
      {!placeHolder ? <div
        className="m-card br-dot-25em m-shadow"
        style={
          canFlip && flip
            ? { transform: 'rotateY(180deg)' }
            : { transform: 'rotateY(0deg)' }
        }
        onClick={() => canFlip && setFlip(!flip)}>
        <div
          className={`br-dot-25em ${
            defaultSide === 'front' ? 'back' : 'front img-background'
          }`}
          style={{
            backgroundImage: `url(${cardBack})`,
          }
          }>
          {/* <h1>This is the back</h1> */}
        </div>
        <div
          className={`br-dot-25em ${
            defaultSide === 'front' ? 'front' : 'back'
          }`}>
          <div className="card-content" style={cardContentStyle}>
            <div
              className="img-background"
              style={{
                flex: 1,
                backgroundImage: `url(/images/standard-deck/${
                  card?.value ? card.value.toString().toLowerCase() : 'a'
                }_${card?.kind || 'spade'}.png)`,
              }}
            />
          </div>
        </div>
      </div>
        : 'EMPTY'}
    </div>
  )
}
