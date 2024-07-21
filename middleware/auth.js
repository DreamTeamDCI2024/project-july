import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const auth = (req, res, next) => {
    try {
        const token = req.header("token");
        console.log("Token from header:", token);
        if(!token) {
            console.log("Token missing from header");
            return res.status(401).send("Access Denied!");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "1234!@#%<{*&)");
        console.log("Decoded token:", decoded);
        req.user = { id: decoded.user, username: decoded.username };
        next();
    } catch (error) {
        console.error("Invalid token:", error);
        res.status(401).send("Invalid token!");
    }
};
export default auth;
