import request from 'supertest'

import app from '../src/app'

describe('GET /awards/intervals', () => {
  it('should return producers with awards intervals', async () => {
    const response = await request(app).get('/awards/intervals')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('min')
    expect(response.body).toHaveProperty('max')

    const minIntervalProducers = response.body.min
    const maxIntervalProducers = response.body.max

    expect(minIntervalProducers.length).toBeGreaterThan(0)
    expect(maxIntervalProducers.length).toBeGreaterThan(0)

    expect(minIntervalProducers[0]).toEqual(
      expect.objectContaining({
        producer: expect.any(String),
        interval: expect.any(Number),
        previousWin: expect.any(Number),
        followingWin: expect.any(Number),
      }),
    )

    expect(maxIntervalProducers[0]).toEqual(
      expect.objectContaining({
        producer: expect.any(String),
        interval: expect.any(Number),
        previousWin: expect.any(Number),
        followingWin: expect.any(Number),
      }),
    )
  })

  it('should return specific structure with awards intervals', async () => {
    const response = await request(app).get('/awards/intervals')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      min: [
        {
          producer: 'Joel Silver',
          interval: 1,
          previousWin: 1990,
          followingWin: 1991,
        },
      ],
      max: [
        {
          producer: 'Matthew Vaughn',
          interval: 13,
          previousWin: 2002,
          followingWin: 2015,
        },
      ],
    })
  })
})
