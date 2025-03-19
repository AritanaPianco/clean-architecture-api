import { type SaveSurveyResultModel } from '@/domain/usecases/save-survey-result'
import { DbSaveSurveyResult } from './db-save-survey-result'
import { type SurveyResultModel } from '@/domain/models/survey-result'
import { type SaveSurveyResultRepository } from '@/data/protocols/db/survey/save-survey-result-repository'

const makeFakeSurveyResultData = (): SaveSurveyResultModel => ({
  surveyId: 'any_surveyId',
  accountId: 'any_accountId',
  answer: 'any_answer',
  date: new Date()
})

const makeFakeSurveyResult = (): SurveyResultModel => Object.assign({}, makeFakeSurveyResultData(), { id: 'any_id' })

const makeSaveSurveyResultRepositoryStub = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return await new Promise(resolve => resolve(makeFakeSurveyResult()))
    }
  }
  return new SaveSurveyResultRepositoryStub()
}

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepositoryStub()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)
  return {
    sut,
    saveSurveyResultRepositoryStub
  }
}

describe('DbSaveSurveyResult UseCase', () => {
  test('should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
    await sut.save(makeFakeSurveyResultData())
    expect(saveSpy).toHaveBeenCalledWith(expect.objectContaining({
      surveyId: 'any_surveyId',
      accountId: 'any_accountId',
      answer: 'any_answer'
    }))
  })

  test('should return a SurveyResult on success', async () => {
    const { sut } = makeSut()
    const surveyResultData = await sut.save(makeFakeSurveyResultData())
    expect(surveyResultData).toEqual(makeFakeSurveyResult())
  })
})
