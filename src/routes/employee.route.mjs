import {Router} from 'express'
import {celebrate} from 'celebrate'

import validator from '../models/validator.mjs'
import { addEmployee, deleteEmployee, getEmployeeById, updateEmployee } from '../controllers/employee.controller.mjs'
import { authMiddleware } from '../middlewares/auth.mjs'

const router = Router()

router.get('/:id', authMiddleware, getEmployeeById)
router.post('/', authMiddleware, celebrate(validator.EMPLOYEE), addEmployee)
router.put('/:id', authMiddleware, celebrate(validator.EMPLOYEE), updateEmployee)
router.delete('/:id', authMiddleware, deleteEmployee)

export default router;
