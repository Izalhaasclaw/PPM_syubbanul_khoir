import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { deleteArtikelById, getArtikel, saveArtikel, showArtikelById, updateArtikelById } from "../controlllers/artikelController.js";


const router = express.Router();

    router.get("/", getArtikel);
    router.post("/", authenticate, saveArtikel);
    router.get("/:id", showArtikelById);
    router.put("/:id",authenticate ,updateArtikelById);
    router.delete("/:id", authenticate, deleteArtikelById);


export default router;