import { SignUpController } from '../../presentation/controllers/signup/signup'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'
import { type Controller } from '../../presentation/protocols'
import { LogControllerDecorator } from '../decorators/log'
import { makeSignupValidation } from './signup-validation'

export const makeSignupController = (): Controller => {
  const bcryptAdapter = new BcryptAdapter(8)
  const accountMongoRepository = new AccountMongoRepository()
  const logMongoRepository = new LogMongoRepository()
  const dbAddAccountUseCase = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const validationComposite = makeSignupValidation()
  const signUpController = new SignUpController(dbAddAccountUseCase, validationComposite)
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
