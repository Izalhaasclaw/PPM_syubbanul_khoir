import { Request, Response } from "express";
import { prisma } from "../lib/db.js";
import bcrypt from "bcrypt";

// menampilkan User
export const getUser = async (req: Request, res: Response) => {
    try {
        const allUser = await prisma.user.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        //tampilkan data
        res.status(200).json({ message: "Data berhasil ditampilkan", user: (allUser) });

    } catch (error) {

        // jika error
        res.status(500).json({
            message: "Error",
            error,
        });

    }
};

// menyimpan data user
export const saveUser = async (req: Request, res: Response) => {
    try {
        const { name, jabatan, password, foto} = req.body;
        
        if (!name || !password  || !jabatan) {
            return res.status(400).json({
                message: "Nama, jabatan, dan password harus diisi!",
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await prisma.user.create({
            data: {
            name,
            jabatan,
            password: hashedPassword,
            foto,
               
            },
        });
        res.status(201).json({
            message: "User berhasil dibuat",
            data: {
                id: newUser.id,
                jabatan: newUser.jabatan,
                name: newUser.name,
                foto: newUser.foto,
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Gagal membuat user",
            error,
        });
    }


};   

// menampilkan data User berdasrkan id
export const showUserById = async (req: Request<{ id: string }>, res: Response) => {
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
        res.json(user);
    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil detail user",
            error,
        });
    }

};

// mengupdate user berdasrkan id
export const updateUserById = async (req: Request<{ id: string }>, res: Response) => {
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
        const { name, password, jabatan, foto } = req.body;
        const hashedPassword = password? await bcrypt.hash(password,10) : undefined
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                name: name ?? existingUser.name,
                jabatan: jabatan ?? existingUser.jabatan,
                password: hashedPassword ?? existingUser.password,
                foto: foto?? existingUser.foto,
               
            },
        });
        res.json({
            message: "User berhasil diupdate",
            data: updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal update user",
            error,
        });
    }


};

// menghapus user berdasarkan id
export const deleteUserById = async (req: Request<{ id: string }>, res: Response) => {
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
        await prisma.user.delete({
            where: { id },
        });
        res.json({
            message: `User id:${id} berhasil dihapus`,
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal menghapus user",
            error,
        });
    }
};