import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { errors } from 'celebrate';

import swaggerUI from 'swagger-ui-express';
import { readFile } from 'fs/promises';
const swaggerDoc = JSON.parse(
  await readFile(
    new URL('./docs/swagger.json', import.meta.url)
  )
);

import customerRouter from './routes/customer.route.mjs'
import employeeRouter from './routes/employee.route.mjs'
import userRouter from './routes/user.route.mjs'


const app = express()
const port = 4000 || process.env.PORT

mongoose.connect('mongodb://localhost:27017/nodejs-unit2')

const options = {
    swaggerOptions: {
      explorer: true,
    },
  };
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc, options));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/customers', customerRouter)
app.use('/employees', employeeRouter)
app.use('/users', userRouter)

app.use(errors())

app.listen(port, () => {
    console.log(`App connected successfully on port ${port}`)
})
