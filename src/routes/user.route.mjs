import {Router} from 'express'
import {celebrate} from 'celebrate'

import validator from '../models/validator.mjs'
import { registerUser, loginUser } from '../controllers/user.controller.mjs'

const router = Router()

router.post('/register', celebrate(validator.USER_REGISTER),  registerUser)
router.post('/login', loginUser)

export default router;
