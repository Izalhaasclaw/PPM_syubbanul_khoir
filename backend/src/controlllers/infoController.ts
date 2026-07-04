import { Request, Response } from "express";
import prisma from "../lib/db.js";

export const getInformasi = async (req: Request, res: Response) => {
  try {
    const informasi = await prisma.informasi.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      message: "Data informasi berhasil ditampilkan",
      data: informasi,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Gagal mengambil data informasi",
      error,
    });
  }
};

export const getInformasiById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    const informasi = await prisma.informasi.findUnique({
      where: { id },
    });

    if (!informasi) {
      return res.status(404).json({
        message: "Informasi tidak ditemukan",
      });
    }

    return res.status(200).json({
      message: "Informasi berhasil ditemukan",
      data: informasi,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Gagal mengambil informasi",
      error,
    });
  }
};

export const createInformasi = async (req: Request, res: Response) => {
  try {
    const { telepon, alamat, email, instagram, tiktok, youtube } = req.body;

    if (!telepon || !email || !alamat || !instagram || !tiktok) {
      return res.status(400).json({
        message: "Telpon, alamat, instagram, dan tiktok wajib diisi",
      });
    }

    const newInformasi = await prisma.informasi.create({
      data: {
        telepon,
        alamat,
        email,
        instagram,
        tiktok,
        youtube,
      },
    });

    return res.status(201).json({
      message: "Informasi berhasil dibuat",
      data: newInformasi,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Gagal membuat informasi",
      error,
    });
  }
};

export const updateInformasiById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    const existingInformasi = await prisma.informasi.findUnique({
      where: { id },
    });

    if (!existingInformasi) {
      return res.status(404).json({
        message: "Informasi tidak ditemukan",
      });
    }

    const { telepon, alamat, instagram, email, tiktok, youtube } = req.body;

    const updatedInformasi = await prisma.informasi.update({
      where: { id },
      data: {
        telepon: telepon ?? existingInformasi.telepon,
        email: email ?? existingInformasi.email,
        alamat: alamat ?? existingInformasi.alamat,
        instagram: instagram ?? existingInformasi.instagram,
        tiktok: tiktok ?? existingInformasi.tiktok,
        youtube: youtube ?? existingInformasi.youtube,
      },
    });

    return res.status(200).json({
      message: "Informasi berhasil diupdate",
      data: updatedInformasi,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Gagal update informasi",
      error,
    });
  }
};

export const deleteInformasiById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    const existingInformasi = await prisma.informasi.findUnique({
      where: { id },
    });

    if (!existingInformasi) {
      return res.status(404).json({
        message: "Informasi tidak ditemukan",
      });
    }

    await prisma.informasi.delete({
      where: { id },
    });

    return res.status(200).json({
      message: `Informasi dengan ID ${id} berhasil dihapus`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Gagal menghapus informasi",
      error,
    });
  }
};
