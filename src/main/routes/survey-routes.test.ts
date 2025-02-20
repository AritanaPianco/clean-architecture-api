import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { type Collection } from 'mongodb'

let surveyCollection: Collection
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
  })
})
