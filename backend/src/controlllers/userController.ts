import { Request, Response } from "express";
import prisma from "../lib/db.js";
import bcrypt from "bcrypt";
import { put, del } from "@vercel/blob";

export const getUser = async (req: Request, res: Response) => {
  try {
    const allUser = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      message: "Data berhasil ditampilkan",
      data: allUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Gagal mengambil data user",
      error,
    });
  }
};

export const saveUser = async (req: Request, res: Response) => {
  try {
    const { name, username, password } = req.body;

    if (!name || !password || !req.file) {
      return res.status(400).json({
        message: "Nama, password, dan foto profil wajib diisi!",
      });
    }

    const blob = await put(
      `avatars/${Date.now()}-${req.file.originalname}`,
      req.file.buffer,
      {
        access: "public",
      },
    );

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        username,
        password: hashedPassword,
        foto: blob.url,
      },
    });

    return res.status(201).json({
      message: "User berhasil dibuat",
      data: {
        id: newUser.id,
        name: newUser.name,
        username: newUser.username,
        foto: newUser.foto,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Gagal membuat user",
      error,
    });
  }
};

export const showUserById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return res.status(404).json({
        message: "User tidak ditemukan",
      });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Gagal mengambil detail user",
      error,
    });
  }
};

export const updateUserById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return res.status(404).json({
        message: "User tidak ditemukan",
      });
    }

    const { name, username, password } = req.body;
    let fotoUrl = existingUser.foto;

    if (req.file) {
      if (
        existingUser.foto &&
        existingUser.foto.includes("public.blob.vercel-storage.com")
      ) {
        try {
          await del(existingUser.foto);
        } catch (err) {
          console.error("Gagal menghapus file lama di Vercel Blob:", err);
        }
      }

      const blob = await put(
        `avatars/${Date.now()}-${req.file.originalname}`,
        req.file.buffer,
        {
          access: "public",
        },
      );
      fotoUrl = blob.url;
    }

    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name: name ?? existingUser.name,
        username: username ?? existingUser.username,
        password: hashedPassword ?? existingUser.password,
        foto: fotoUrl,
        updatedAt: new Date(),
      },
    });

    return res.json({
      message: "User berhasil diupdate",
      data: {
        id: updatedUser.id,
        name: updatedUser.name,
        username: updatedUser.username,
        foto: updatedUser.foto,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Gagal update user",
      error,
    });
  }
};

export const deleteUserById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return res.status(404).json({
        message: "User tidak ditemukan",
      });
    }

    if (
      existingUser.foto &&
      existingUser.foto.includes("public.blob.vercel-storage.com")
    ) {
      try {
        await del(existingUser.foto);
      } catch (err) {
        console.error("Gagal menghapus file saat delete user:", err);
      }
    }

    await prisma.user.delete({
      where: { id },
    });

    return res.json({
      message: `User id:${id} berhasil dihapus`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Gagal menghapus user",
      error,
    });
  }
};
