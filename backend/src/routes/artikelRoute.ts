import express from "express";
import { deleteArtikelById, getArtikel, saveArtikel, showArtikelById, updateArtikelById } from "../controlllers/artikelController.js";


const router = express.Router();

    router.get("/", getArtikel);
    router.post("/", saveArtikel);
    router.get("/:id", showArtikelById);
    router.put("/:id", updateArtikelById);
    router.delete("/:id", deleteArtikelById);


export default router;