import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { type Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let surveyCollection: Collection
let accountCollection: Collection

describe('Surveys Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL!)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /survey', () => {
    test('should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/survey').send({
          question: 'any_question',
          answers: [
            {
              answer: 'any_answer',
              image: 'http://image-name.com'
            },
            {
              answer: 'other_answer'
            }
          ]
        })
        .expect(403)
    })
    test('should return 204 on add survey with valid token', async () => {
      const res = await accountCollection.insertOne({
        name: 'Aritana',
        email: 'ari@gmail.com',
        password: '123',
        role: 'admin'
      })
      const id = res.ops[0]._id
      const accessToken = sign({ id }, env.jwtSecret)
      await accountCollection.updateOne({
        _id: id
      }, {
        $set: {
          accessToken
        }
      })

      await request(app)
        .post('/api/survey')
        .set('x-access-token', accessToken)
        .send({
          question: 'any_question',
          answers: [
            {
              answer: 'any_answer',
              image: 'http://image-name.com'
            },
            {
              answer: 'other_answer'
            }
          ]
        })
        .expect(204)
    })
  })
})
