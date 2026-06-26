import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

// Buat fungsi middleware untuk memverifikasi 
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    //  Logic untuk memverifikasi 
    const authHeader = req.headers.authorization

    
    // Jika header kosong
    if (!authHeader) {
        return res.status(401).json({ message: 'Token tidak valid' });
    }

    //  Dapatkan token
    const token = authHeader.split(' ')[1];

    //  Cek token
    if (!token) {
        return res.status(401).json({ message: 'Token tidak ditemukan' });
    }

    // Jika token ditemukan, verifikasi token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);

        (req as any).user = decoded;
        
        // Jika token valid, lanjutkan ke route berikutnya
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token tidak valid' });
    }
}