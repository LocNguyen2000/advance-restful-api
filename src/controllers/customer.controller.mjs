import { Customers, Employees } from "../models/model.mjs";
import logger from "../utils/logger.mjs";

export const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params

        logger.info(`Getting customer ${id}`)

        const customerInDB = await Customers.findById(id);

        if (req.role === 'President' || req.role === 'Manager') {
            if (!customerInDB){
                logger.error('Customer not found')
                return res.status(204).json('Not found customer');
            } 

            logger.info(`Find customer: ${customerInDB}`)

            return res.status(200).json(customerInDB);
        }
        else if (req.role === 'Leader') {
            if (!customerInDB){
                logger.error('Customer not found')
                return res.status(204).json('Not found customer');
            } 

            const employeeBelongToCustomer = await Employees.find({employeeNumber: customerInDB.salesRepEmployeeNumber})

            if (employeeBelongToCustomer.officeCode !== req.user.officeCode){
                logger.error(`Customer's employee does not belong in same office as user ${req.user.employeeNumber}`)
                return res.status(403).json('Customer employee not belong in same office as user')
            }

            return res.status(200).json(customerInDB);
        }
        else {
            if (!customerInDB){
                logger.error('Customer not found')
                return res.status(204).json('Not found customer');
            } 

            if (customerInDB.salesRepEmployeeNumber !== req.user.employeeNumber){
                logger.error('Customer does not belong to this staff')
                return res.status(403).json('Customer does not belong to this staff')
            }
            return res.status(200).json(customerInDB);
        }
    } catch (error) {
        logger.error(error.message);
        return res.status(500).json(error.message)
    }
}

export const addCustomer = async (req, res) => {
    try {
        const customerReq = req.body;
        const newCustomer = new Customers(customerReq);

        logger.info(`Adding customer ${customerReq}`)

        if (req.role === 'President' || req.role === 'Manager') {
            await newCustomer.save()
            
            logger.info(`Create new data succesfully: ${customerReq}`)
            return res.status(201).json('Create new data succesfully')
        }
        else if (req.role === 'Leader'){
            const employeeBelongToCustomer = await Employees.find({employeeNumber: newCustomer.salesRepEmployeeNumber})

            if (employeeBelongToCustomer.officeCode !== req.user.officeCode){
                logger.error(`Customer's employee does not belong in same office as user ${req.user.employeeNumber}`)
                return res.status(403).json('Customer employee not belong in same office as user')
            }
            
            await newCustomer.save()
    
            logger.info(`Create new data succesfully: ${customerReq}`)
            return res.status(201).json('Create new data succesfully')
        }
        else {
            if (newCustomer.salesRepEmployeeNumber !== req.user.employeeNumber){
                logger.error('Customer does not belong to this staff')
                return res.status(403).json('Customer does not belong to this staff')
            }

            await newCustomer.save()
    
            logger.info(`Create new data succesfully: ${customerReq}`)
            return res.status(201).json('Create new data succesfully')
        }

    } catch (error) {
        logger.error(error.message)
        return res.status(400).json(error.message)
    }
}

export const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const customerReq = req.body;

        logger.info(`Updating customer ${id}`)

        if (req.role === 'President' || req.role === 'Manager') {
            let updateCustomer = await Customers.findByIdAndUpdate(id, customerReq).exec()
    
            if (!updateCustomer) {
                return res.status(404).json('Not exist customer')
            }

            logger.info(`Update customer successfully to ${updateCustomer}`)
            return res.status(200).json('Update customer successfully')
        }
        else if (req.role === 'Leader'){
            const employeeBelongToCustomer = await Employees.find({employeeNumber: customerReq.salesRepEmployeeNumber})

            if (employeeBelongToCustomer.officeCode !== req.user.officeCode){
                logger.error(`Customer's employee does not belong in same office as user ${req.user.employeeNumber}`)
                return res.status(403).json('Customer employee not belong in same office as user')
            }

            let updateCustomer = await Customers.findByIdAndUpdate(id, customerReq).exec()
    
            if (!updateCustomer) {
                logger.error('Not exist customer')
                return res.status(404).json('Not exist customer')
            }
    
            logger.info(`Update customer successfully to ${updateCustomer}`)
            return res.status(200).json('Update customer successfully')

        }
        else {
            logger.error(`${req.role} does not have enough privileges`)
            return res.status(403).json(`${req.role} does not have enough privileges`)
        }
    } catch (error) {
        logger.error(error.message)
        return res.status(500).json(error.message)
    }
}

export const deleteCustomer = async (req, res) => {
    try {
        if (req.role === 'President' || req.role === 'Manager') {
            const { id } = req.params;
            logger.info(`Deleting customer ${id}`)

            let deleteCustomer = await Customers.findByIdAndDelete(id).exec()
    
            if (!deleteCustomer) {
                logger.error('Customer not found')
                return res.status(404).json('Not exist customer')
            }
    
            logger.error(`Delete customer ${deleteCustomer.customerNumber} successfully`)
            return res.status(200).json('Delete customer successfully')        
        }
        else if (req.role === 'Leader'){
            const customerInDB = await Customers.findById(id);
            const employeeBelongToCustomer = await Employees.find({employeeNumber: customerInDB.salesRepEmployeeNumber})

            if (employeeBelongToCustomer.officeCode !== req.user.officeCode){
                logger.error(`Customer's employee does not belong in same office as user ${req.user.employeeNumber}`)
                return res.status(400).json('Customer employee not belong in same office as user')
            }

            let deleteCustomer = await Customers.findByIdAndDelete(id).exec()
    
            if (!deleteCustomer) {
                logger.error(`Not exist customer`)
                return res.status(404).json('Not exist customer')
            }

            logger.info('Delete customer successfully')
            return res.status(200).json('Delete customer successfully')
        }
        else {
            logger.error(`${req.role} are not authorized`)
            return res.status(403).json(`${req.role} are not authorized`)
        }
    } catch (error) {
        logger.error(error.message)
        return res.status(500).json(error.message)
    }
}