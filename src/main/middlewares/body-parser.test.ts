import request from 'supertest'
import app from '../config/app'

describe('Body Parser Middleware', () => {
  test('should parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Ari' })
      .expect({ name: 'Ari' })
  })
})
