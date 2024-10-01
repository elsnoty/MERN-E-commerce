import express from 'express'
import {GetAllReviews, PostReview, GetReviewsByProduct} from '../ControllRoutes/ControllReview'


const router = express.Router()

// get all the reviews
router.get('/', GetAllReviews)

// post a reviews 
router.post('/',PostReview )

router.get('/:productId',GetReviewsByProduct )

export default router