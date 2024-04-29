import fs from 'fs'

import csvParser from 'csv-parser'
import sqlite3 from 'sqlite3'

let db: sqlite3.Database

export async function initializeDatabase(): Promise<void> {
  deleteDatabaseFile('./src/data/movielist.db')

  db = new sqlite3.Database('./src/data/movielist.db')

  // Create movies table
  db.exec(`
    CREATE TABLE movies (
      id INTEGER PRIMARY KEY,
      year INT,
      title TEXT,
      studios TEXT,
      producers TEXT,
      winner TEXT
    )
  `)

  // Load CSV data into the database
  await loadCSVData('./src/data/movielist.csv')
}

export function connectToDatabase(): sqlite3.Database {
  db = new sqlite3.Database('./src/data/movielist.db', (err) => {
    if (err) {
      console.error('Error connecting to SQLite database:', err)
    }
  })

  return db
}

export function deleteDatabaseFile(filePath: string): void {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
}

async function loadCSVData(filePath: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser({ separator: ';' }))
      .on(
        'data',
        async (data: {
          year: string
          title: string
          studios: string
          producers: string
          winner: string
        }) => {
          try {
            await db.run(
              'INSERT INTO movies (year, title, studios, producers, winner) VALUES (?, ?, ?, ?, ?)',
              [
                parseInt(data.year),
                data.title.trim(),
                data.studios.trim(),
                data.producers.trim(),
                data.winner.trim(),
              ],
            )
          } catch (error) {
            console.error('Error inserting data into database:', error)
            reject(error)
          }
        },
      )
      .on('end', () => {
        console.log(
          'CSV file successfully processed and loaded into the database',
        )
        resolve()
      })
      .on('error', (error: unknown) => {
        console.error('Error while processing CSV file:', error)
        reject(error)
      })
  })
}
