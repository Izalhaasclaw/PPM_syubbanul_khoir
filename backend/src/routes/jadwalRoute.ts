import express from "express";
import { deleteJadwalById, getJadwal, saveJadwal, showJadwalById, updateJadwalById } from "../controlllers/jadwalController.js";

const router = express.Router();

    router.get("/", getJadwal);
    router.post("/", saveJadwal);
    router.get("/:id", showJadwalById);
    router.put("/:id", updateJadwalById);
    router.delete("/:id", deleteJadwalById);


export default router;