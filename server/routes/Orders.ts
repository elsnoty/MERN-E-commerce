import express from 'express'
import {PostOrder, GetAllOrders, GetOrder} from '../ControllRoutes/ControllOrders'
const router = express.Router()

router.post('/orders', PostOrder)
router.get('/orders', GetAllOrders)
router.get('/orders/user/:userId', GetOrder)

export default router;