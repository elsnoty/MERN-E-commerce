import express from 'express'
import {PostOrder, GetAllOrders, GetOrder} from '../ControllRoutes/ControllOrders'
const router = express.Router()

router.post('/', PostOrder)
router.get('/', GetAllOrders)
router.get('/user/:userId', GetOrder)

export default router;