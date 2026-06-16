import express from "express";
import { deleteUserById, getUser, saveUser, showUserById, updateUserById } from "../controlllers/userController.js";

const router = express.Router();

    router.get("/", getUser);
    router.post("/", saveUser);
    router.get("/:id", showUserById);
    router.put("/:id", updateUserById);
    router.delete("/:id", deleteUserById);


export default router;