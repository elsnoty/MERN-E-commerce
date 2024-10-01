    import express from 'express'
    import {GetAllProducts, PostProduct, UpdateProduct, SingleProduct} from '../ControllRoutes/ConrollProduct'

    const router = express.Router()

    // get all the Products
    router.get('/', GetAllProducts)

    // post a product 
    router.post('/',PostProduct )


    //Update a Product
    router.patch('/:id',UpdateProduct )

    //single a Product
    router.get('/:id',SingleProduct )

    module.exports = router;
