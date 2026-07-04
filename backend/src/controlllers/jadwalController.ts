import { Request, Response } from "express";
import prisma from "../lib/db.js";

export const getJadwal = async (req: Request, res: Response) => {
  try {
    const allJadwal = await prisma.jadwal.findMany({
      orderBy: {
        tanggal: "asc",
      },
    });

    res.status(200).json({
      message: "Data jadwal berhasil ditampilkan",
      data: allJadwal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menampilkan data jadwal",
      error,
    });
  }
};

export const saveJadwal = async (req: Request, res: Response) => {
  try {
    const { acara, lokasi, tanggal, waktu } = req.body;

    if (!acara || !lokasi || !tanggal || !waktu) {
      res.status(400).json({
        message: "Data jadwal belum lengkap",
      });
      return;
    }

    const newJadwal = await prisma.jadwal.create({
      data: {
        acara,
        lokasi,
        tanggal: new Date(tanggal),
        waktu,
      },
    });

    res.status(201).json({
      message: "Jadwal berhasil dibuat",
      data: newJadwal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal membuat jadwal",
      error,
    });
  }
};

export const showJadwalById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    const jadwal = await prisma.jadwal.findUnique({
      where: { id },
    });

    if (!jadwal) {
      res.status(404).json({
        message: "Jadwal tidak ditemukan",
      });
      return;
    }

    res.status(200).json(jadwal);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data jadwal",
      error,
    });
  }
};

export const updateJadwalById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    const existingJadwal = await prisma.jadwal.findUnique({
      where: { id },
    });

    if (!existingJadwal) {
      res.status(404).json({
        message: "Jadwal tidak ditemukan",
      });
      return;
    }

    const { acara, lokasi, tanggal, waktu } = req.body;

    const updatedJadwal = await prisma.jadwal.update({
      where: { id },
      data: {
        // 👈 Masukkan kolom 'acara' dan 'lokasi' agar ikut terupdate
        acara: acara ?? existingJadwal.acara,
        lokasi: lokasi ?? existingJadwal.lokasi,
        // 👈 Bungkus string tanggal ke dalam new Date() agar dikenali sebagai DateTime oleh Prisma
        tanggal: tanggal ? new Date(tanggal) : existingJadwal.tanggal,
        waktu: waktu ?? existingJadwal.waktu,
      },
    });

    res.status(200).json({
      message: "Jadwal berhasil diupdate",
      data: updatedJadwal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal update jadwal",
      error,
    });
  }
};

export const deleteJadwalById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    const existingJadwal = await prisma.jadwal.findUnique({
      where: { id },
    });

    if (!existingJadwal) {
      res.status(404).json({
        message: "Jadwal tidak ditemukan",
      });
      return;
    }

    await prisma.jadwal.delete({
      where: { id },
    });

    res.status(200).json({
      message: `Jadwal ID ${id} berhasil dihapus`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus jadwal",
      error,
    });
  }
};
