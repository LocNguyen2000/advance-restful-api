import { celebrate, Joi, errors, Segments } from 'celebrate';
import { response } from 'express';
import { joiPasswordExtendCore } from 'joi-password';

const joiPassword = Joi.extend(joiPasswordExtendCore)

const validator = {
    USER_REGISTER: {
        [Segments.BODY]: Joi.object().keys({
            username: Joi.string()
                .required()
                .not(null)
                .min(3).max(20),
            password: joiPassword.string()
                .required()
                .not(null)
                .minOfSpecialCharacters(1).minOfNumeric(1)
                .min(6).max(100),
            employeeNumber: Joi.number()
                .required()
                .not(null)
                .positive()
        })
    },
    EMPLOYEE: {
        [Segments.BODY]: Joi.object().keys({
            employeeNumber: Joi.number().positive().not(null).required(),
            lastName: Joi.string().min(3).max(50).not(null).required(),
            firstName: Joi.string().min(3).max(50).not(null).required(),
            extension: Joi.string().max(50).not(null).required(),
            email: Joi.string().email().not(null).min(10).max(100).required(),
            officeCode: Joi.string().not(null).max(10).required(),
            reportsTo: Joi.number().positive().allow(null).optional(),
            jobTitle: Joi.string().valid("President", "Manager", "Leader", "Staff").required()
        })
    },
    CUSTOMER: {
        [Segments.BODY]: Joi.object().keys({
            customerNumber: Joi.number().positive().not(null).required(),
            customerName: Joi.string().min(5).max(50).not(null).required(),
            contactLastName: Joi.string().min(3).max(50).not(null).required(),
            contactFirstName: Joi.string().min(3).max(50).not(null).required(),
            phone: Joi.string().min(8).max(20).not(null).required(),
            addressLine1: Joi.string().min(10).max(50).not(null).required(),
            addressLine2: Joi.string().min(10).max(50).not(null).required(),
            city: Joi.string().min(2).max(50).not(null).required(),
            state: Joi.string().min(2).max(50).allow(null).optional(),
            postalCode: Joi.string().min(5).max(15).allow(null).optional(),
            country: Joi.string().min(2).max(50).not(null).required(),
            salesRepEmployeeNumber: Joi.number().allow(null).positive(),
            creditLimit: Joi.number().precision(2).allow(null).optional()
        })
    }
}

export default validator;