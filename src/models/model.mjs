import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    // FK to employee
    employeeNumber: {
        type: Number, 
        required: true, 
        unique: true, 
        dropDups: true,
        immutable: true,
    }
})

const customerSchema = new mongoose.Schema({
    customerNumber: {
        type: Number,
        required: true,
        min: [1, 'Must be positive'],
        immutable: true,
        unique: true, 
        dropDups: true
    },
    customerName: {
        type: String,
    },
    contactLastName: { type: String },
    contactFirstName: { type: String },
    phone: { type: String },
    adressLine1: { type: String },
    adressLine2: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String },
    // FK to employee
    salesRepEmployeeNumber: { type: Number, required: true }
})

const employeeSchema = new mongoose.Schema({
    employeeNumber: {
        type: Number,
        required: true,
        min: [1, 'Must be positive'],
        immutable: true,
        unique: true, dropDups: true
    },
    firstName: {
        type: String,
        required: true,
        min: [3, 'Must be at least 3 chars'],
        max: [50, 'No more than 50 chars'],
        immutable: true
    },

    lastName: {
        type: String,
        required: true,
        min: [3, 'Must be at least 3 chars'],
        max: [50, 'No more than 50 chars'],
        immutable: true
    },
    extension: {
        type: String,
        max: [50, 'No more than 50 chars'],
        required: true
    },
    email: {
        type: String,
        min: [10, 'Must be at least 10 chars'],
        max: [100, 'No more than 100 chars'],
        required: true,
        // validation: ''
    },
    officeCode: {
        type: String,
        min: [10, 'Must be at least 10 chars'],
        required: true,
    },
    // Reference to other employee
    reportsTo: {
        type: Number, ref: "employee", min: [1, 'Must be positive'],
    },
    jobTitle: { type: String, required: true, enum: ['President', 'Manager', 'Leader', 'Staff'] }
})

export const Users = mongoose.model('user', userSchema)
export const Customers = mongoose.model('customer', customerSchema)
export const Employees = mongoose.model('employee', employeeSchema)