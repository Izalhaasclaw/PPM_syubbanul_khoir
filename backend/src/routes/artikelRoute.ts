import express from "express";
import multer from "multer"; 
import { authenticate } from "../middlewares/authMiddleware.js";
import { deleteArtikelById, getArtikel, saveArtikel, showArtikelById, updateArtikelById } from "../controlllers/artikelController.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getArtikel);

router.post("/", authenticate, upload.single("foto"), saveArtikel);

router.get("/:id", showArtikelById);

router.put("/:id", authenticate, upload.single("foto"), updateArtikelById);

router.delete("/:id", authenticate, deleteArtikelById);

export default router;