import jwt from "jsonwebtoken";

import logger from '../utils/logger.mjs'
import { Employees } from "../models/model.mjs";
import config from '../config/config.mjs'

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, config.secretKey, async (err, payload) => {
                if (err) {
                    logger.error('Authenticated fail')
                    return res.status(403).json('Not authenticated');
                }

                const user = payload.data

                let resultUser = await Employees.findOne({ employeeNumber: user.employeeNumber})
                
                if (!resultUser){
                    logger.error('User not found with this token')

                    return res.status(404).json('Not exist user with this token')
                }

                req.user = resultUser;
                req.role = resultUser.jobTitle;

                logger.info(`User ${user.username} logged in: ${resultUser}`)

                next();
            });
        } else {
            logger.error('Not authenticated: User token required')
            res.status(401).json('No token found');
        }
    } catch (error) {
        logger.error(error.message)        
        return res.status(500).json(error.message);
    }
}