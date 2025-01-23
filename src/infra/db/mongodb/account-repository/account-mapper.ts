import { type AccountModel } from '../../../../domain/models/account'

export const map = (result: any): AccountModel => {
  const account = {
    id: result._id,
    name: result.name,
    email: result.email,
    password: result.password
  }
  return account
}
