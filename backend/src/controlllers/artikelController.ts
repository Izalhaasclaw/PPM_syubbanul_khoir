import { Request, Response } from "express";
import prisma from "../lib/db.js";
import { put, del } from "@vercel/blob";

export const getArtikel = async (req: Request, res: Response) => {
  try {
    const allArtikel = await prisma.artikel.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      message: "Data artikel berhasil ditampilkan",
      data: allArtikel,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menampilkan artikel",
      error,
    });
  }
};

export const saveArtikel = async (req: Request, res: Response) => {
  try {
    const { judul, isi } = req.body;

    if (!req.file) {
      res.status(400).json({ message: "Foto artikel wajib diunggah" });
      return;
    }

    if (!judul || !isi) {
      res.status(400).json({ message: "Judul dan isi wajib diisi" });
      return;
    }

    const blob = await put(req.file.originalname, req.file.buffer, {
      access: "public",
    });

    const newArtikel = await prisma.artikel.create({
      data: {
        judul,
        isi,
        foto: blob.url,
      },
    });

    res.status(201).json({
      message: "Artikel berhasil dibuat",
      data: newArtikel,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Gagal membuat artikel",
      error: error.message || error,
    });
  }
};

export const showArtikelById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    const artikel = await prisma.artikel.findUnique({
      where: { id },
    });

    if (!artikel) {
      res.status(404).json({
        message: "Artikel tidak ditemukan",
      });
      return;
    }

    res.status(200).json(artikel);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil artikel",
      error,
    });
  }
};

export const updateArtikelById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    const existingArtikel = await prisma.artikel.findUnique({
      where: { id },
    });

    if (!existingArtikel) {
      res.status(404).json({
        message: "Artikel tidak ditemukan",
      });
      return;
    }

    const { judul, isi } = req.body;
    let fotoUrl = existingArtikel.foto;

    if (req.file) {
      if (existingArtikel.foto) {
        try {
          await del(existingArtikel.foto);
        } catch (err) {
          console.error("Gagal menghapus file lama dari Vercel Blob:", err);
        }
      }

      const blob = await put(req.file.originalname, req.file.buffer, {
        access: "public",
      });
      fotoUrl = blob.url;
    }

    const updatedArtikel = await prisma.artikel.update({
      where: { id },
      data: {
        judul: judul ?? existingArtikel.judul,
        isi: isi ?? existingArtikel.isi,
        foto: fotoUrl,
        updatedAt: new Date(),
      },
    });

    res.status(200).json({
      message: "Artikel berhasil diupdate",
      data: updatedArtikel,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Gagal update artikel",
      error: error.message || error,
    });
  }
};

export const deleteArtikelById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    const existingArtikel = await prisma.artikel.findUnique({
      where: { id },
    });

    if (!existingArtikel) {
      res.status(404).json({
        message: "Artikel tidak ditemukan",
      });
      return;
    }

    if (existingArtikel.foto) {
      try {
        await del(existingArtikel.foto);
      } catch (err) {
        console.error(
          "Gagal menghapus file dari Vercel Blob saat hapus artikel:",
          err,
        );
      }
    }

    await prisma.artikel.delete({
      where: { id },
    });

    res.status(200).json({
      message: `Artikel ID ${id} dan file gambar terkait berhasil dihapus`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus artikel",
      error,
    });
  }
};
