import { EmailValidation } from './email-validation'
import { type EmailValidator } from '../protocols/email-validator'
import { InvalidParamError } from '../../presentation/errors'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStup implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStup()
}

type SutTypes = {
  sut: EmailValidation
  emailValidatorStup: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorStup = makeEmailValidator()
  const sut = new EmailValidation('email', emailValidatorStup)
  return {
    sut,
    emailValidatorStup
  }
}

describe('Email Validation', () => {
  test('should return an error if EmailValidator returns false', () => {
    const { sut, emailValidatorStup } = makeSut()
    jest.spyOn(emailValidatorStup, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({ email: 'any_email@mail.com' })
    expect(error).toEqual(new InvalidParamError('email'))
  })
  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStup } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStup, 'isValid').mockReturnValueOnce(false)
    sut.validate({ email: 'any_email@mail.com' })
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
  test('Should throw if EmailValidator throws', () => {
    const { sut, emailValidatorStup } = makeSut()
    jest.spyOn(emailValidatorStup, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(sut.validate).toThrow()
  })
})
