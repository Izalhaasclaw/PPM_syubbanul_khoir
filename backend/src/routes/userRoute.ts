import express from "express";
import { deleteUserById, getUser, saveUser, showUserById, updateUserById } from "../controlllers/userController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

    router.get("/", getUser);
    router.post("/", authenticate, saveUser);
    router.get("/:id", showUserById);
    router.put("/:id", authenticate, updateUserById);
    router.delete("/:id", authenticate, deleteUserById);


export default router;