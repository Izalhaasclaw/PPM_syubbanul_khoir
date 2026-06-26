import express from "express";
import { deleteUserById, getUser, saveUser, showUserById, updateUserById } from "../controlllers/userController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import multer from "multer"; 

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

    router.get("/", getUser);
    router.post("/", authenticate, upload.single("foto"),saveUser);
    router.get("/:id", showUserById);
    router.put("/:id", authenticate, upload.single("foto"), updateUserById);
    router.delete("/:id", authenticate, deleteUserById);


export default router;