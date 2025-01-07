import { MissingParamError } from '../../errors'
import { type Validation } from './validation'
import { ValidationComposite } from './validation-composite'

describe('Validation Composite', () => {
  test('should return an error if any validation fails', () => {
    class ValidationStub implements Validation {
      validate (input: any): Error | null {
        return new MissingParamError('field')
      }
    }
    const validationStup = new ValidationStub()
    const sut = new ValidationComposite([validationStup])
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
