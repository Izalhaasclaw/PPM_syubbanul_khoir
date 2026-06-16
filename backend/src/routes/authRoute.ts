import express from "express";
import { login } from "../controlllers/authController.js";


const router = express.Router();

router.post("/", login);

export default router;