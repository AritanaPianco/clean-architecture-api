import { type AccountModel } from '../../../../domain/models/account'
import { type AddAccountModel } from '../../../../domain/usecases/add-account'

export const map = (result: any, accountData: AddAccountModel): AccountModel => {
  const account = {
    id: result.insertedId.toString(),
    ...accountData
  }
  return account
}
