import {Router} from 'express'
import {celebrate} from 'celebrate'

import validator from '../models/validator.mjs'
import { addCustomer, deleteCustomer, getCustomerById, updateCustomer } from '../controllers/customer.controller.mjs'
import { authMiddleware } from '../middlewares/auth.mjs'

const router = Router()

router.get('/:id', authMiddleware, getCustomerById)
router.post('/', authMiddleware, celebrate(validator.CUSTOMER), addCustomer)
router.put('/:id',authMiddleware, celebrate(validator.CUSTOMER), updateCustomer)
router.delete('/:id', authMiddleware, deleteCustomer)

export default router;
