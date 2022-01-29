import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { RequestHandler } from 'express'
import "reflect-metadata"
import { getManager } from 'typeorm'
import  User  from '../entities/UserEntity'

const SECRET = 'aurora'

//user register
export const register : RequestHandler = async (req, res, next) => {

    try{
        //entity manager for db operations
        const entityManager = getManager()

        //create the user to register
        const user = new User()
        user.name = req.body.name,
        user.surname = req.body.surname,
        user.userName = req.body.userName,

        //hash the password
        user.password = bcrypt.hashSync( req.body.password, 10)
 
        let saved = await entityManager.save(user)
        
        //generate the jwt token 
        const token = jwt.sign({ _id: saved._id.toString() }, SECRET, {expiresIn:'7d'} )
        saved.token = token

        saved = await entityManager.save(saved)

        //set cookie
        res.cookie("token", token, {
            httpOnly: true,
        })

        //session data
        req.session.useragent = req.headers['user-agent']
        req.session.user = user._id

        res.status(201).send(saved)
    
    }catch(e){
        res.status(400).send("username exists or required field is empty")
    }
    
}

//user login
export const login : RequestHandler = async (req, res, next) => {

    try{
        
        //check database with the username
        const entityManager = getManager()
        const user = await entityManager.findOne(User,{userName: req.body.userName})

        if(user){

            //check if the hashed password matches
            const pass = bcrypt.compareSync(req.body.password, user.password)

            if(pass){

                //session data
                req.session.useragent = req.headers['user-agent']     
                req.session.user = user._id

                //generate the jwt token 
                const token = jwt.sign({ _id: user._id.toString() }, SECRET, {expiresIn:'7d'} )

                user.token = token

                //entity manager for db operations
                //save to db
                const entityManager = getManager()
                const saved = await entityManager.save(user)

                //set cookie
                res.cookie("token", token, {
                    httpOnly: true,
                })

                res.status(200).send(saved)
            }
            else{
                res.status(400).send("wrong password")
            }
        }

        else{
            res.status(400).send('no such user')
        }
    
    }catch(e){
        res.status(400).send("cannot login")
    }
    
}

//user logout
export const logout : RequestHandler = async (req, res, next) => {

    try{
        if(req.userId){
            //remove the user related data
            req.userId = undefined
            res.clearCookie("token")
            res.clearCookie("connect.sid")
            req.session.destroy(() => {})
        }
        res.status(200).send()
    }catch(e){
        res.status(400).send()
    }
    
}