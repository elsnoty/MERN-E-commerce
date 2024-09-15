import express from 'express'
import {GetAllReviews, PostReview} from '../ControllRoutes/ControllReview'


const router = express.Router()

// get all the reviews
router.get('/', GetAllReviews)

// post a reviews 
router.post('/',PostReview )

export default router