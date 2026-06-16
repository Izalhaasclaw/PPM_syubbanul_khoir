import express from "express";
import { createInformasi, deleteInformasiById, getInformasi, getInformasiById, updateInformasiById } from "../controlllers/infoController.js";

const router = express.Router();

    router.get("/", getInformasi);
    router.post("/", createInformasi);
    router.get("/:id", getInformasiById);
    router.put("/:id", updateInformasiById);
    router.delete("/:id", deleteInformasiById);


export default router;