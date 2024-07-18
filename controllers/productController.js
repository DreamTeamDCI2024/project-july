import path from 'path';
import { promises as fs } from 'fs';
import Product from '../models/productModel.js';
import cloudinary from '../config/cloudinaryConfig.js';

export async function getProducts(req, res) {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

export async function createProduct(req, res) {
    try {
        const { name, description, price, categories, dimensions, materials, images, stock, featured } = req.body;
        
        //send the images to cloudinary and match the url with the descriptions
        const results = await Promise.all(
            images.map(image => cloudinary.uploader.upload(image.path)
                .then(result => ({
                    url: result.url,
                    description: image.description
                })))
        );
        const newProduct = new Product({
            name,
            description,
            price,
            categories,
            dimensions,
            materials,
            images:results,
            stock,
            featured
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: 'Error creating product: ' + error.message });
    }
}
export async function updateProduct(req, res) {
    const { id } = req.params; 
    const { name, description, price, categories, materials, stock, featured, images } = req.body;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (images && images.length > 0) {
            const imageUploads = images.map(async image => {
                const result = await cloudinary.uploader.upload(image.path);
                return {
                    url: result.url,
                    description: image.description 
                };
            });
            const imageUrls = await Promise.all(imageUploads);
            product.images = imageUrls;  //This replaces all existing images, we adjust as needed
        }
        // update the props of products
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.categories = categories || product.categories;
        product.materials = materials || product.materials;
        product.stock = stock || product.stock;
        product.featured = featured || product.featured;
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: 'Error updating product: ' + error.message });
    }
}

export async function deleteProduct(req, res) {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export async function getProductImageUrl(req, res) {
    try {
        const product = await Product.findById(req.params.id).select('images');
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product.images);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
} 
export async function patchProductImage(req, res) {
    const { images } = req.body; 
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // uploading the images to cloudinary and storen the urls in db
        const imageUploads = images.map(async image => {
            if (typeof image.path !== 'string') {
                throw new Error(`Invalid path: ${image.path}`);
            }
            const imagePath = path.resolve('..', image.path);
            //check if exist... -the file
            try {
                await fs.access(imagePath);
            } catch {
                throw new Error(`File not found: ${imagePath}`);
            }

            const result = await cloudinary.uploader.upload(imagePath); 
            return {
                url: result.url,
                description: image.description
            };
        });
        const imageUrls = await Promise.all(imageUploads);
        //Adding new images to the imageArray
        product.images.push(...imageUrls);
        await product.save();
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
