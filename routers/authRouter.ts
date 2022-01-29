import auth from '../middleware/auth'
import {register, login, logout} from '../controllers/authController'
import { Router } from "express"

const router = Router()

//routers
router.post('/register', register )
router.post('/login', login) 
router.get('/logout', auth, logout)

export default router