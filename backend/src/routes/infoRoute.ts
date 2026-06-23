import express from "express";
import { createInformasi, deleteInformasiById, getInformasi, getInformasiById, updateInformasiById } from "../controlllers/infoController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

    router.get("/", getInformasi);
    router.post("/", authenticate, createInformasi);
    router.get("/:id", getInformasiById);
    router.put("/:id", authenticate, updateInformasiById);
    router.delete("/:id", authenticate, deleteInformasiById);


export default router;