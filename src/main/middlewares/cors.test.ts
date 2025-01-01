import request from 'supertest'
import app from '../config/app'

describe('CORS Middleware', () => {
  test('should enable CORS', async () => {
    app.get('/test_cors', (req, res) => {
      res.send()
    })
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    await request(app)
      .post('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
