import { type Validation } from '../../presentation/protocols/validation'
import { InvalidParamError } from '../../presentation/errors'

export class CompareFieldsValidation implements Validation {
  private error: Error | null

  constructor (
    private readonly fieldName: string,
    private readonly fieldToCompareName: string) {}

  validate (input: any): Error | null {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      this.error = new InvalidParamError(this.fieldToCompareName)
    }
    return this.error
  }
}
