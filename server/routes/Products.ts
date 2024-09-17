import express from 'express'
import {GetAllProducts, PostProduct, UpdateProduct, SingleProduct} from '../ControllRoutes/ConrollProduct'

const router = express.Router()

// get all the Products
router.get('/products', GetAllProducts)

// post a product 
router.post('/products',PostProduct )


//Update a Product
router.patch('/products/:id',UpdateProduct )

//single a Product
router.get('/products/:id',SingleProduct )

export default router;