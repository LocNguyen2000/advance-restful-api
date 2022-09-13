import { Employees } from "../models/model.mjs";
import logger from "../utils/logger.mjs";

export const getEmployeeById = async (req, res) => {
    try {
        if (req.role === 'President' || req.role === 'Manager' || req.role === 'Leader') {
            const { id } = req.params

            const employeeInDB = await Employees.findById(id);

            if (!employeeInDB){
                logger.error('Employee not found')
                return res.status(204).json('Employee not found');
            } 

            logger.info(`Get employee: ${employeeInDB}`)
            return res.status(200).json(employeeInDB);
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

export const addEmployee = async (req, res) => {
    try {
        if (req.role === 'President' || req.role === 'Manager') {
            const employeeReq = req.body;

            const newEmployee = new Employees(employeeReq);

            await newEmployee.save()

            return res.status(201).json('Create new data succesfully')
        }
        else {
            return res.status(403).json(`${req.role} are not authorized`)
        }
    } catch (error) {
        console.log(error.message);
        return res.status(400).json(error.message)
    }
}

export const updateEmployee = async (req, res) => {
    try {
        if (req.role === 'President' || req.role === 'Manager') {
            const { id } = req.params;
            const employeeReq = req.body;

            let updateEmployee = await Employees.findByIdAndUpdate(id, employeeReq).exec()

            if (!updateEmployee) {
                return res.status(404).json('Not exist employee')
            }

            return res.status(200).json('Update employee successfully')
        }
        else {
            return res.status(403).json(`${req.role} are not authorized`)
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message)
    }
}

export const deleteEmployee = async (req, res) => {
    try {
        if (req.role === 'President') {
            const { id } = req.params;

            let deleteEmployee = await Employees.findByIdAndDelete(id).exec()

            if (!deleteEmployee) {
                return res.status(404).json('Not exist employee')
            }

            return res.status(200).json('Delete employee successfully')
        }
        else {
            return res.status(403).json(`${req.role} are not authorized`)
        }

    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message)
    }
}