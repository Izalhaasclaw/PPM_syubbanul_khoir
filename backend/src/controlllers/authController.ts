import {Request, Response} from 'express'  
import {prisma} from '../lib/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req: Request, res: Response) => {
    try {
        const { name, password } = req.body;

        if (!name || !password) {
            return res.status(400).json({
                message: "Name and password are required"
            });
        }

       const existingUser = await prisma.user.findFirst({
                where: { name },
            });

        if (!existingUser) {
            return res.status(401).json({
                message: "Name or password is incorrect"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Name or password is incorrect"
            });
        }

        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
            throw new Error("JWT_SECRET belum diset");
        }

        const token = jwt.sign(
            {
                userId: existingUser.id,
                name: existingUser.name,
            },
            jwtSecret,
            {
                expiresIn: "1h",
            }
        );

        return res.status(200).json({
            message: "Login berhasil",
            user: {
                id: existingUser.id,
                name: existingUser.name,
            },
            token,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Terjadi kesalahan server",
            error: error instanceof Error ? error.message : error,
        });
    }
};