import { type AddAccount, type AddAccountModel, type AccountModel, type Encrypter } from './db-add-account-protocols'

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
