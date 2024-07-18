import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRoutes from './routes/productRouter.js';

dotenv.config();

// Initialize the app
const app = express();

// PORT
const PORT = process.env.PORT || 4000;

// Use the json middleware
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb", extended: true }));

// Paths
app.get('/', (req, res) => {
    console.log("Hello");
})
app.use('/api',productRoutes);

// Listening server
mongoose
    .connect(process.env.CONNECTION_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });
    })
    .catch((error) => console.log(error));

console.log('PORT:', process.env.PORT);
console.log('CONNECTION_URL:', process.env.CONNECTION_URL);