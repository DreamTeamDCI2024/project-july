import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';
import Set from './models/productSetModels.js';
import cloudinary from './config/cloudinaryConfig.js';
import {products} from './data/products.js';
import {sets} from './data/sets.js';
import path from 'path';

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

   async function seedSets() {
    try {
      // Esta línea es para eliminar los sets y repoblar la base de datos
      // await Set.deleteMany({});
  
      for (const setData of sets) {
        const imageUpload = setData.images.map(image => uploadImage(path.resolve(image.path)));
        const imageUrls = await Promise.all(imageUpload);
  
        const imagesWithUrls = imageUrls.map((url, index) => ({
          url: url,
          description: setData.images[index].description
        }));
  
        const newSet = new Set({
          name: setData.name,
          description: setData.description,
          products: setData.products,
          price: setData.price,
          images: imagesWithUrls,
          featured: setData.featured
        });
  
        await newSet.save();
        console.log('Set guardado:', newSet);
      }
      console.log('Sets seeded successfully');
    } catch (error) {
      console.error('Error seeding sets:', error);
    } finally {
      mongoose.connection.close();
    }
  }
  
 //createProducts();

 seedSets().catch(error => {
    console.error('Error seeding sets:', error);
    mongoose.connection.close();
  });
