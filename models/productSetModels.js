import { Schema, model } from "mongoose";
//This model can be especially useful for selling thematic or decorative sets that are designed 
//to complement each other, such as a living room set or a bedroom decor set.

const setSchema = new Schema ({
    name: {
        type: String,
        required: true,
        trim: true  // this remove whitespace from both ends of a string
    },
    description: {
      type: String,
      required: true 
    },
    products: [{
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true  // Reference to individual product IDs included in the set
      },
      quantity: {
        type: Number,
        required: true,
        min: 1  // Quantity of each product in the set
      }
    }],
    price: {
      type: Number,
      required: true  // Total price of the set, possibly with a discount
    },
    images: [{
        url: {
          type: String,
          required: true 
        },
        description: {
          type: String,  // Optional description of the image
          required: false
        }
    }],
    featured: {
        type: Boolean,
        default: false  // Flag to highlight in promotions
      },
      createdAt: {
        type: Date,
        default: Date.now  //date of set creation
      },
      updatedAt: {
        type: Date,
        default: Date.now  // Auto-generated date of last update
    }
});
const Set = model('Set', setSchema);
export default Set;

