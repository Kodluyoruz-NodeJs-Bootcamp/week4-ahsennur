import path from 'path'
import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import "reflect-metadata"

import authrouter from './routers/authRouter'
import usersrouter from './routers/usersRouter'
import {createConnection} from "typeorm"

const app = express()

const publicDirectoryPath = path.join(__dirname, './public')
const port = 3000

//set app
app.use(express.static(publicDirectoryPath))

app.use(bodyParser.json())
app.use(cookieParser())

app.use(express.urlencoded({
    extended: true
}))

app.use(session ({
    secret: "a-secret",
    resave: true,
    saveUninitialized: false
}))

//set routers
app.use(authrouter)
app.use(usersrouter)

//create db connection and start to listen
createConnection().then(connection =>{
    console.log("db is ok")
    app.listen(port, () => {
        console.log(`Server is up on port ${port}`)
    }) 
})
