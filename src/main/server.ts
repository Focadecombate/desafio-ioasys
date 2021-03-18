import { prisma } from '../infra/database/prisma/utils/prisma-client'
const port = 3001

prisma.$connect()
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(port, () => console.log(`Server running at http://localhost/${port}`))
  })
  .catch(console.log)
