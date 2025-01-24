import { type Validation } from '../../protocols/validation'
import { InvalidParamError } from '../../errors'
import { type EmailValidator } from '../../protocols/email-validator'

export class EmailValidation implements Validation {
  private error: Error | null

  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate (input: any): Error | null {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      this.error = new InvalidParamError(this.fieldName)
    }
    return this.error
  }
}
