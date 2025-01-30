import { type Express, Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  const routesDir = path.join(__dirname, '..', 'routes')
  readdirSync(routesDir).map(async file => {
    if (!file.includes('.test.')) {
      const filePath = path.join(routesDir, file);
      (await import(filePath)).default(router)
    }
  })
}
