import auth from '../middleware/auth'
import {getUsers} from '../controllers/usersController'
import { Router } from "express"

const router = Router()

//routers
router.get('/users', auth, getUsers)

export default router