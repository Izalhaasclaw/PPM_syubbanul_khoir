import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// Menampilkan semua artikel
export const getArtikel = async (req: Request, res: Response) => {
try {
const allArtikel = await prisma.artikel.findMany({
orderBy: {
tanggal: "desc",
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

// Menyimpan artikel
export const saveArtikel = async (req: Request, res: Response) => {
try {
const { judul, isi, foto, tanggal } = req.body;

    if (!judul || !isi || !tanggal) {
        res.status(400).json({
            message: "Judul, isi, dan tanggal wajib diisi",
        });
        return;
    }

    const newArtikel = await prisma.artikel.create({
        data: {
            judul,
            isi,
            foto,
            tanggal: new Date(tanggal),
        },
    });

    res.status(201).json({
        message: "Artikel berhasil dibuat",
        data: newArtikel,
    });

} catch (error) {
    res.status(500).json({
        message: "Gagal membuat artikel",
        error,
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

// Update artikel
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

    const { judul, isi, foto, tanggal } = req.body;

    const updatedArtikel = await prisma.artikel.update({
        where: { id },
        data: {
            judul: judul ?? existingArtikel.judul,
            isi: isi ?? existingArtikel.isi,
            foto: foto ?? existingArtikel.foto,
            tanggal: tanggal
                ? new Date(tanggal)
                : existingArtikel.tanggal,
        },
    });

    res.status(200).json({
        message: "Artikel berhasil diupdate",
        data: updatedArtikel,
    });

} catch (error) {
    res.status(500).json({
        message: "Gagal update artikel",
        error,
    });
}

};

// Hapus artikel
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

    await prisma.artikel.delete({
        where: { id },
    });

    res.status(200).json({
        message: `Artikel ID ${id} berhasil dihapus`,
    });

} catch (error) {
    res.status(500).json({
        message: "Gagal menghapus artikel",
        error,
    });
}

};
