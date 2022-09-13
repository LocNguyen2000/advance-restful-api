import jwt from 'jsonwebtoken'
import config from '../config/config.mjs'
import bcrypt from 'bcrypt'

export const jwtGenerate = (userInfo) => {
  const payload = {
    data: userInfo,
  }
  return jwt.sign(payload, config.secretKey, { expiresIn: 60 * 60 })
}

export const comparePassword = async (loginPass, userPassword) => {
  const isPassword = await bcrypt.compare(loginPass, userPassword)

  return isPassword
}

export const encryptPassword = async (password) => {
  // generate salt for bcrypt randomness
  const saltRound = 10
  const salt = await bcrypt.genSalt(saltRound)

  // encrypt pass with bcrypt
  const encrypted = await bcrypt.hash(password, salt)

  return encrypted
}