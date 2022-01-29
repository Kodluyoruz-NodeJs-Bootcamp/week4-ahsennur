import jwt from 'jsonwebtoken'
import { RequestHandler } from 'express'

const SECRET = 'aurora'

//interface for the _id field in the jwtpayload
interface JwtPayload {
    _id: string
}

//auth check the user 
const auth : RequestHandler = async (req, res, next) => {

    try{
        //check if user agents match
        if(req.session.useragent != req.headers['user-agent']){
            throw new Error()
        }

        //get the token and verify 
        const token = req.cookies.token
        
        const { _id } = jwt.verify(token, SECRET) as JwtPayload
        if (_id != req.session.user) {
            throw new Error()
        }
        
        req.userId = req.session.user
        next()
    }catch(e){
        res.status(400).send("please login")
    }
}

export default auth