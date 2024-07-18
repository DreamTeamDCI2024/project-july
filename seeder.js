import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';
import cloudinary from './config/cloudinaryConfig.js';
import {products} from './data/products.js';

dotenv.config();

// With this function we upload the objects that create in -data/products.js- and these in turn obtain the images
// from the ProductImage folder -using path
// First, the images are sent to cloudinary to obtain the URLs  and saved together with the object in the database.

mongoose.connect(process.env.CONNECTION_URL)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));
 
   async function uploadImage(imagePath) {
       const result = await cloudinary.uploader.upload(imagePath);
       return result.url;
   }
   async function createProducts() {
    try{
        //this line is for delete the products and populate again
        //await Product.deleteMany({}); 

        for(const product of products){
            const imageUpload = product.images.map(image => uploadImage(image.path));
            const imageUrls = await Promise.all(imageUpload);

            const imagesWithUrls = imageUrls.map((url, index) => ({
                url: url,
                description: product.images[index].description
            }));
            const newProduct = new Product({
                ...product,
                images: imagesWithUrls
            });
            await newProduct.save();
            console.log('Producto guardado:', newProduct);
        }
    } catch (error) {
        console.error('Error creating products:', error);
    }
   }
 createProducts();
