import { makeLoginValidation } from './login-validation-factory'
import { ValidationComposite, RequiredFieldValidation, EmailValidation } from '../../../../validation/validators'
import { type Validation } from '../../../../presentation/protocols/validation'
import { type EmailValidator } from '../../../../validation/protocols/email-validator'

jest.mock('../../../../validation/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStup implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStup()
}

describe('LoginValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
