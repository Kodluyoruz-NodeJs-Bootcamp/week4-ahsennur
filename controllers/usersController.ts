import { RequestHandler } from 'express'
import "reflect-metadata"
import {getManager} from "typeorm"

import User from "../entities/UserEntity"

//list all users
export const getUsers : RequestHandler = async (req, res, next) => {

    try{
        //entity manager for db operations
        //find and get the user info to display
        const entityManager = getManager() 
        const users = await entityManager.find(User)
        const usersInfo = users.map(element => {
        return {
            name: element.name,
            surname : element.surname,
            userName : element.userName
        }
    })
        res.status(200).send(usersInfo)

    }catch(e){
        res.status(400).send("Cannot get users")
    }
    
}
