import express from 'express'
import {GetAllReviews, PostReview, GetReviewsByProduct} from '../ControllRoutes/ControllReview'


const router = express.Router()

// get all the reviews
router.get('/reviews', GetAllReviews)

// post a reviews 
router.post('/reviews',PostReview )

router.get('/reviews/:productId',GetReviewsByProduct )

export default router