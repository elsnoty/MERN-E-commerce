import express from 'express'
import {Login, Register, GetUseres} from '../ControllRoutes/ControllUser'

const router = express.Router()

router.post('/register', Register)

router.post('/login', Login)
router.get('/login', GetUseres)


export default router;