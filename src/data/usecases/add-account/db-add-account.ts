import { type AddAccount, type AddAccountModel } from '../../../domain/usecases/add-account'
import { type AccountModel } from '../../../domain/models/account'
import { type Encrypter } from '../../protocols/encrypter'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter

  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(account.password)
    const fakeCreatedAccount = {
      id: 'any_id',
      name: 'valid_name',
      email: 'valid_email',
      password: hashedPassword
    }
    return await new Promise((resolve) => { resolve(fakeCreatedAccount) })
  }
}
