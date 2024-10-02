import express from 'express'
import {Login, Register, GetUsers} from '../ControllRoutes/ControllUser'

const router = express.Router()

router.post('/register', Register)

router.post('/login', Login)
router.get('/login', GetUsers)


export default router;