export type TKind = 'heart' | 'diamond' | 'club' | 'spade'

export type TCardValue = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 'J' | 'Q' | 'K' | 'A'

export interface ICard {
  kind: TKind,
  value: TCardValue
}

export type TPlayerStatus = 'STAND' | 'DRAW' | 'WAITING' | 'SHOW_HAND'

export type TDeckValueStatus = 'NOT_ENOUGHT_POINT' | 'ENOUGHT_POINT' | 'OVER_POINT' | 'DOUBLE_ACE' | 'BLACK_JACK' | 'DEATH_FLAG' | 'FIVE_STARS'

export type TPlayerType = 'HOST' | 'PLAYER'

export interface IDeckValue {
  status: TDeckValueStatus
  value: number
}

export type TDuelResult = 'WIN' | 'LOSE' | 'DRAW'

export type TGamePhase = 'WAITING_PLAYER' | 'PREPARE' | 'DIVIDE_CARDS' | 'DUEL'