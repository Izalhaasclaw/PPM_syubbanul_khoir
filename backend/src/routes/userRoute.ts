import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { deleteUserById, getUser, saveUser, showUserById, updateUserById } from "../controlllers/userController.js";

const router = express.Router();

    router.get("/", authenticate, getUser);
    router.post("/", authenticate, saveUser);
    router.get("/:id", authenticate, showUserById);
    router.put("/:id", authenticate, updateUserById);
    router.delete("/:id", authenticate, deleteUserById);


export default router;