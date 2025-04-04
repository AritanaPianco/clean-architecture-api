import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { type Collection } from 'mongodb'
import { hash } from 'bcrypt'

let accountCollection: Collection
describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL!)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('should return 200 on signup', async () => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      await request(app)
        .post('/api/signup').send({
          name: 'Ari',
          email: 'ari@gmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
    })
  })
  describe('POST /login', () => {
    test('should return 200 on login', async () => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      const password = await hash('123', 8)
      await accountCollection.insertOne({
        name: 'Ari',
        email: 'ari@gmail.com',
        password
      })
      await request(app)
        .post('/api/login').send({
          email: 'ari@gmail.com',
          password: '123'
        })
        .expect(200)
    })
    test('should return 401 on login', async () => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      await request(app)
        .post('/api/login').send({
          email: 'ari@gmail.com',
          password: '123'
        })
        .expect(401)
    })
  })
})
