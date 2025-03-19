import { type SaveSurveyResultModel } from '@/domain/usecases/save-survey-result'
import { type SurveyResultModel } from '@/domain/models/survey-result'

export interface SaveSurveyResultRepository {
  save(data: SaveSurveyResultModel): Promise<SurveyResultModel>
}
