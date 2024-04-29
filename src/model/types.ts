export interface Movie {
  year: number
  title: string
  studios: string
  producers: string
  winner: string
  interval?: number
}

export interface Producer {
  producer: string
  interval: number
  previousWin: number
  followingWin: number
}
