import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { ValidationComposite, RequiredFieldValidation } from '../../../../../validation/validators'
import { type Validation } from '../../../../../presentation/protocols/validation'

jest.mock('../../../../../validation/validators/validation-composite')

describe('SurveyValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation()
    const validations: Validation[] = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
