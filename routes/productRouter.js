import express from 'express';
import { getProducts,
         createProduct,
         updateProduct,
         deleteProduct,
         getProductImageUrl,
         patchProductImage } from '../controllers/productController.js';

const router = express.Router();

router.get('/products', getProducts); //Here we access all products in the database

router.post('/products', createProduct); //Here is to create new products

router.put('/products/:id', updateProduct);

router.delete('/products/:id', deleteProduct);

router.get('/products/:id/images', getProductImageUrl);

router.patch('/products/:id/images', patchProductImage);

export default router;