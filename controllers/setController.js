import Set from "../models/productSetModel.js";
import Product from "../models/productModel.js";
import cloudinary from "../config/cloudinaryConfig.js";
import mongoose from "mongoose";

async function verifyProductsExist(productIds) {
    const existingProducts = await Product.find({ '_id': { $in: productIds } });
    if (existingProducts.length !== productIds.length) {
        throw new Error('Some products do not exist');
    }
}
export async function createSet(req, res) {
    try {
        const { name, description, products, price, images, featured } = req.body;
        const formattedProducts = products.map(prod => ({
            productId: new mongoose.Types.ObjectId(prod.productId),  // Asegúrate de convertir a ObjectId
            quantity: prod.quantity
        }));
        const newSet = new Set({
            name,
            description,
            products:formattedProducts,
            price,
            images: [],
            featured
        });
        if (images && images.length > 0) {
            const uploadedImages = await Promise.all(
                images.map(async image => {
                    const result = await cloudinary.uploader.upload(image.path);
                    return {
                        url: result.url,
                        description: image.description
                    };
                })
            );
            newSet.images = uploadedImages;
        }
        await newSet.save();
        res.status(201).json(newSet);
    } catch (error) {
        res.status(400).json({ message: 'Error creating set: ' + error.message });
    }
}
export async function getSets(req, res) {
    try {
        const sets = await Set.find().populate('products');
        res.status(200).json(sets);
    } catch (error) {
        res.status(400).json({ message: 'Error retrieving sets: ' + error.message });
    }
}
export async function deleteSet(req, res) {
    try {
        const set = await Set.findByIdAndDelete(req.params.id);
        if (!set) {
            return res.status(404).json({ message: "Set not found" });
        }
        res.status(204).send(); 
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: "Internal server error" });
    }
}
export async function getSetImageUrl(req, res) {
    try{
        const set = await Set.findById(req.params.id).select('images');
        if (!set) {
            return res.status(404).json({ message: "Set not found" });
        }
        res.json(set.images);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
function applyTransformations(url, transformations) {
    const baseUrl = url.split('/upload/');
    const transformedUrl = `${baseUrl[0]}/upload/${transformations}/${baseUrl[1]}`;
    return transformedUrl;
}
export async function getSetImageByIndex(req, res) {
    try {
        const { setId, index } = req.params;
        const set = await Set.findById(setId);
        if (!set) {
            return res.status(404).json({ message: 'Set not found' });
        }
        const imageIndex = parseInt(index, 10);
        if (isNaN(imageIndex) || imageIndex < 0 || imageIndex >= set.images.length) {
            return res.status(404).json({ message: 'Image index out of bounds' });
        }
        const image = set.images[imageIndex];
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }
        const transformations = 'w_400,h_400,c_fit'; // we can use c_fit or c_fill
        const transformedImageUrl = applyTransformations(image.url, transformations);
        res.redirect(transformedImageUrl);
    } catch (error) {
        res.status(400).json({ message: 'Error retrieving image: ' + error.message });
    }
}
export async function getSetDetails(req, res) {
    try {
        const { id } = req.params;
        const set = await Set.findById(id).populate('products.productId');

        if (!set) {
            return res.status(404).json({ message: 'Set not found' });
        }

        // Formatear la respuesta para incluir los detalles del producto y la cantidad
        const setDetails = {
            name: set.name,
            description: set.description,
            products: set.products.map(item => ({
                product: item.productId,
                quantity: item.quantity
            })),
            price: set.price,
            images: set.images,
            featured: set.featured,
            createdAt: set.createdAt,
            updatedAt: set.updatedAt
        };

        res.status(200).json(setDetails);
    } catch (error) {
        res.status(400).json({ message: 'Error retrieving set details: ' + error.message });
    }
}