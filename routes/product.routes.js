import express from 'express'
import * as productController from '../controller/product.controller.js'
import { guardMiddleware } from '../middleware/auth.middleware.js'
import { createProductValidator, updateProductValidator } from '../validator/product.validator.js'
const router = express.Router()

router.get('/products/get-all', guardMiddleware, productController.getAllProducts)
router.get('/products/detail/:uuid', guardMiddleware, productController.getProductById)
router.post('/products/create', guardMiddleware, createProductValidator, productController.createProduct)
router.put('/products/update/:uuid', guardMiddleware, updateProductValidator, productController.updateProduct)
router.delete('/products/delete/:uuid', guardMiddleware, productController.deleteProduct)

export default router;