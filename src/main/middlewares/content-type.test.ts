import request from 'supertest'
import app from '../config/app'

describe('Content Type Middleware', () => {
  test('should return default content type as json', async () => {
    app.get('/test_content-type', (req, res) => {
      res.send()
    })
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    await request(app)
      .get('/test_content-type')
      .expect('content-type', /json/)
  })
  test('should return xml content type when forced', async () => {
    app.get('/test_content-type-xml', (req, res) => {
      res.type('xml')
      res.send('')
    })
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    await request(app)
      .get('/test_content-type-xml')
      .expect('content-type', /xml/)
  })
})
