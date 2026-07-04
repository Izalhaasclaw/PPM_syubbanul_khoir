import { Request, Response } from "express";
import prisma from "../lib/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    const existingUser = await prisma.user.findFirst({
      where: { username: username },
    });

    if (!existingUser) {
      return res.status(401).json({
        message: "Username or password is incorrect",
      });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Username or password is incorrect",
      });
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET belum diset");
    }

    const token = jwt.sign(
      {
        userId: existingUser.id,
        username: existingUser.username,
      },
      jwtSecret,
      {
        expiresIn: "1h",
      },
    );

    return res.status(200).json({
      message: "Login berhasil",
      user: {
        id: existingUser.id,
        username: existingUser.username,
        foto: existingUser.foto,
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
