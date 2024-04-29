import { Request, Response } from 'express'

import { Movie, Producer } from '../model/types'
import { connectToDatabase } from '../services/sqlite.service'

// Route to get the producer with the longest gap between two consecutive awards and the producer who got two awards faster
export default function getExtremeIntervals(req: Request, res: Response): void {
  const db = connectToDatabase()

  db.all('SELECT * FROM movies', (err: Error | null, rows: Movie[]) => {
    if (err) {
      console.error('Error fetching movies from database:', err)
      res.status(500).json({ error: 'Error fetching movies from database' })
    } else {
      const sortedMovies = rows.sort((a: Movie, b: Movie) => a.year - b.year)

      const winnersMap: Map<string, number[]> = new Map()
      const intervalsMap: Map<string, Producer[]> = new Map()

      // Fill in the winners map
      for (const movie of sortedMovies) {
        if (movie.winner === 'yes') {
          const producers = movie.producers
            .split(/,| and /)
            .map((s) => s.trim())
          for (const producer of producers) {
            if (producer !== '') {
              if (!winnersMap.has(producer)) {
                winnersMap.set(producer, [])
              }
              winnersMap.get(producer)?.push(movie.year)
            }
          }
        }
      }

      // Calculate intervals for each producer
      for (const [producer, years] of winnersMap.entries()) {
        const intervals: Producer[] = []

        for (let i = 0; i < years.length - 1; i++) {
          const interval = years[i + 1] - years[i]
          const intervalInfo: Producer = {
            producer: producer,
            interval: interval,
            previousWin: years[i],
            followingWin: years[i + 1],
          }
          intervals.push(intervalInfo)
        }

        intervalsMap.set(producer, intervals)
      }

      // Find the producers with the smallest and largest range
      let minInterval: Producer[] = []
      let maxInterval: Producer[] = []

      for (const intervals of intervalsMap.values()) {
        if (intervals.length > 0) {
          const min = intervals.reduce((acc, cur) =>
            acc.interval < cur.interval ? acc : cur,
          )
          const max = intervals.reduce((acc, cur) =>
            acc.interval > cur.interval ? acc : cur,
          )

          if (
            minInterval.length === 0 ||
            min.interval < minInterval[0].interval
          ) {
            minInterval = [min]
          } else if (min.interval === minInterval[0].interval) {
            minInterval.push(min)
          }

          if (
            maxInterval.length === 0 ||
            max.interval > maxInterval[0].interval
          ) {
            maxInterval = [max]
          } else if (max.interval === maxInterval[0].interval) {
            maxInterval.push(max)
          }
        }
      }

      res.json({ min: minInterval, max: maxInterval })
    }
  })
}
