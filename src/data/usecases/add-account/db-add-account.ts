import { type AddAccount, type AddAccountModel, type AccountModel, type Encrypter, type AddAccountRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository

  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    const fakeCreatedAccount = {
      id: 'any_id',
      name: 'valid_name',
      email: 'valid_email',
      password: hashedPassword
    }
    return await new Promise((resolve) => { resolve(fakeCreatedAccount) })
  }
}
