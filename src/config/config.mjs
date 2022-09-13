import * as dotenv from 'dotenv'

dotenv.config({ path: '../.env.local' })

export default {
  port: process.env.PORT,
  secretKey: process.env.SECRET_KEY,
}
