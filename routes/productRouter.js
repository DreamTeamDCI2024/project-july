import express from 'express';
import { getProducts,
         createProduct,
         updateProduct,
         deleteProduct,
         getProductImageUrl,
         patchProductImage,
         getProductImageByIndex } from '../controllers/productController.js';

const router = express.Router();

router.get('/products', getProducts); //Here we access all products in the database

router.post('/products', createProduct); //Here is to create new products

router.put('/products/:id', updateProduct);

router.delete('/products/:id', deleteProduct);

router.get('/products/:id/images', getProductImageUrl);

router.patch('/products/:id/images', patchProductImage); //To add image to an existing product

router.get('/products/:productId/images/index/:index', getProductImageByIndex);// Here we can see the image by index in images array(the image come transformed from cloudinary)
export default router;