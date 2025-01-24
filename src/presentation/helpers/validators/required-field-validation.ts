import { MissingParamError } from '../../errors'
import { type Validation } from '../../protocols/validation'

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
