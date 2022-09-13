import { Users } from "../models/model.mjs"
import logger from "../utils/logger.mjs"
import {encryptPassword, comparePassword, jwtGenerate} from '../utils/security.mjs'

export const registerUser = async (req, res) => {
    try {
        // body request
        const userRequest = req.body
        logger.info(`Request body: ${userRequest}`)

        userRequest.password = await encryptPassword(userRequest.password)
    
        const newUser = new Users(userRequest);

        await newUser.save()
        
        logger.info(`Register successfull: ${newUser}`)
        return res.status(200).json('Register successful')

      } catch (error) {
        logger.error(error.message)
        return res.status(500).json(error.message)
      }
}

export const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;

        const userInDB = await Users.findOne({username});

        if (!userInDB){
            logger.error(`Account not found with this username ${username}`)
            return res.status(400).json('Account not exist');
        }
        const isValidPass = await comparePassword(password, userInDB.password);

        if (!isValidPass){
            logger.error(`Password or username is incorrect`)
            return res.status(401).json('Password or username is incorrect');
        }
        
        const jwtToken = jwtGenerate(userInDB);

        logger.info(`Login successfully - token received ${jwtToken}`)
        return res.status(200).json({accessToken: jwtToken})

    } catch (error) {
        logger.error(error.message)
        return res.status(500).json(error.message)
    }
}