import { Request, Response } from "express";
import { prisma } from "../lib/db.js";
import { put, del } from "@vercel/blob"; // 👈 Tambahkan put dan del dari Vercel Blob

// Menampilkan semua artikel
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

// Menyimpan artikel baru (Upload ke Vercel Blob)
export const saveArtikel = async (req: Request, res: Response) => {
  try {
    const { judul, isi } = req.body; // 👈 foto dihapus dari req.body

    // Validasi file gambar dari multer
    if (!req.file) {
      res.status(400).json({ message: "Foto artikel wajib diunggah" });
      return;
    }

    if (!judul || !isi) {
      res.status(400).json({ message: "Judul dan isi wajib diisi" });
      return;
    }

    // 1. Upload file buffer ke Vercel Blob
    const blob = await put(req.file.originalname, req.file.buffer, {
      access: "public",
    });

    // 2. Simpan URL Blob ke database TiDB
    const newArtikel = await prisma.artikel.create({
      data: {
        judul,
        isi,
        foto: blob.url, // 👈 Menyimpan URL string dari vercel storage
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

// Menampilkan artikel berdasarkan ID
export const showArtikelById = async (
  req: Request<{ id: string }>,
  res: Response
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

// Update artikel (Ganti file lama di Vercel Blob jika ada upload baru)
export const updateArtikelById = async (
  req: Request<{ id: string }>,
  res: Response
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
    let fotoUrl = existingArtikel.foto; // Default gunakan foto lama

    // Jika user mengunggah file foto baru
    if (req.file) {
      // Hapus file foto lama di Vercel Blob agar hemat storage
      if (existingArtikel.foto) {
        try {
          await del(existingArtikel.foto);
        } catch (err) {
          console.error("Gagal menghapus file lama dari Vercel Blob:", err);
        }
      }

      // Upload file foto baru
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
        foto: fotoUrl, // Menggunakan url baru atau tetap yang lama
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

// Hapus artikel beserta file gambarnya dari Vercel Blob
export const deleteArtikelById = async (
  req: Request<{ id: string }>,
  res: Response
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

    // Hapus file dari Vercel Blob sebelum menghapus row data di TiDB
    if (existingArtikel.foto) {
      try {
        await del(existingArtikel.foto);
      } catch (err) {
        console.error("Gagal menghapus file dari Vercel Blob saat hapus artikel:", err);
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