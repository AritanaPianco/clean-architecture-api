import { MongoHelper as sut } from './mongo-helper'
describe('MongoHelper', () => {
  beforeAll(async () => {
    const uri = process.env.MONGO_URL as string
    await sut.connect(uri)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('should reconnect if mongodb is down', async () => {
    let accountColletion = await sut.getCollection('accounts')
    expect(accountColletion).toBeTruthy()
    accountColletion = await sut.getCollection('accounts')
    expect(accountColletion).toBeTruthy()
  })
})
