import { SignUpController } from '../../../presentation/controllers/signup/signup-controller'
import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { type Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { makeSignupValidation } from './signup-validation-factory'

export const makeSignupController = (): Controller => {
  const bcryptAdapter = new BcryptAdapter(8)
  const accountMongoRepository = new AccountMongoRepository()
  const logMongoRepository = new LogMongoRepository()
  const dbAddAccountUseCase = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const validationComposite = makeSignupValidation()
  const signUpController = new SignUpController(dbAddAccountUseCase, validationComposite)
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
