import { MissingParamError } from '../../presentation/errors'
import { type Validation } from '../../presentation/protocols/validation'

export class RequiredFieldValidation implements Validation {
  private error: Error | null

  constructor (private readonly fieldName: string) {}

  validate (input: any): Error | null {
    if (!input[this.fieldName]) {
      this.error = new MissingParamError(this.fieldName)
    }
    return this.error
  }
}
