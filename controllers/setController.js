import Set from "../models/productSetModel.js";
import Product from "../models/productModel.js";
import cloudinary from "../config/cloudinaryConfig.js";

async function verifyProductsExist(productIds) {
    const existingProducts = await Product.find({ '_id': { $in: productIds } });
    if (existingProducts.length !== productIds.length) {
        throw new Error('Some products do not exist');
    }
}
export async function createSet (req, res){
    try{
        const {name, description, products, price, images, featured} = req.body;
        
        await verifyProductsExist(products);
        const set = await Set.findById(req.params.id);
        if (!set) {
            return res.status(404).json({ message: 'Set not found' });
        }
        set.name = name;
        set.description = description;
        set.products = products;
        set.price = price;
        if(images){
          set.images = await Promise.all(
            images.map( async image => {
                const result = await cloudinary.uploader.upload(image.path);
                return {
                    url: result.url,
                    description: image.description
                };
            })
          );
        }
        await set.save();
        res.status(200).json(set);
    }catch (error) {
        res.status(400).json({ message: 'Error updating set: ' + error.message });
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
        res.status(204).send();  // No content to return after deletion
    } catch (error) {
        console.error(error);  // Log the error for internal use
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