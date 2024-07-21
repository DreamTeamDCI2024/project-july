import express from "express";

import { signUp, login, getAllUsers } from "../controllers/authconroller.js";

const router = express.Router();

router.get("/allusers", getAllUsers);
router.post("/signup", signUp);
router.post("/login", login);

export default router;
