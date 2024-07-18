import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true  //this is imp. to remove whitespace from both ends of a string
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    categories: [{
        type: String  //for product classification
    }],
    dimensions: {
        length: {
            type: Number,
            required: false  //All this is optional
        },
        width: {
            type: Number,
            required: false
        },
        height: {
            type: Number,
            required: false
        }
    },
    materials: [{
        type: String // Array of materials used in the product. That can justify the price
    }],
    images: [{
        url: {
            type: String, // URL of the product image
            required: true
        },
        description: {
            type: String,
            required: false // Optional description of the image
        },
    }],
    stock: {
        type: Number,
        required: true  // Inventory quantity of the product
    },
    featured: {
      type: Boolean,
      default: false  // Flag to highlight the product in promotions
    },
    createdAt: {
        type: Date,
        default: Date.now  // Auto-generated date of product creation
    },
    updatedAt: {
      type: Date,
      default: Date.now  // Auto-generated date of last update
    }
});
const Product = model('Product', productSchema);
 export default Product;