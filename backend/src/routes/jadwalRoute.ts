import express from "express";
import { deleteJadwalById, getJadwal, saveJadwal, showJadwalById, updateJadwalById } from "../controlllers/jadwalController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

    router.get("/", getJadwal);
    router.post("/", authenticate, saveJadwal);
    router.get("/:id", showJadwalById);
    router.put("/:id", authenticate, updateJadwalById);
    router.delete("/:id", authenticate, deleteJadwalById);


export default router;