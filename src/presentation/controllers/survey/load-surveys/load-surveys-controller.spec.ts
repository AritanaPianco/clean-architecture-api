import { type SurveyModel } from '../../../../domain/models/survey'
import { LoadSurveysController } from './load-surveys-controller'
import { type LoadSurveys } from '../../../../domain/usecases/load-surveys'
import { noContent, serverError } from '../../../helpers/http/http-helper'

const makeFakeSurveys = (): SurveyModel[] => {
  return [{
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
  },
  {
    id: 'other_id',
    question: 'other_question',
    answers: [{
      image: 'other_image',
      answer: 'other_answer'
    }],
    date: new Date()
  }]
}

const makeLoadSurveysStub = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return await new Promise(resolve => resolve(makeFakeSurveys()))
    }
  }

  return new LoadSurveysStub()
}

interface SutTypes {
  sut: LoadSurveysController
  loadSurveysStub: LoadSurveys
}

const makeSut = (): SutTypes => {
  const loadSurveysStub = makeLoadSurveysStub()
  const sut = new LoadSurveysController(loadSurveysStub)
  return {
    sut,
    loadSurveysStub
  }
}

describe('LoadSurveys Controller', () => {
  test('should call LoadSurveys', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({})
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveLength(2)
    expect(response.body[0]).toHaveProperty('id')
    expect(response.body[0]).toHaveProperty('question')
    expect(response.body[0]).toHaveProperty('answers')
    expect(response.body[0]).toHaveProperty('date')
  })
  test('should return 204 if LoadSurveys retur empty', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockReturnValueOnce(new Promise(resolve => resolve([])))
    const response = await sut.handle({})
    expect(response.statusCode).toBe(204)
    expect(response).toEqual(noContent())
  })
  test('should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const response = await sut.handle({})
    expect(response.statusCode).toBe(500)
    expect(response).toEqual(serverError(new Error()))
  })
})
