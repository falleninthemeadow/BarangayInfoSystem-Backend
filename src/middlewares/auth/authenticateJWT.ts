import type { NextFunction, Request, Response } from "express";
import { jwtUtil } from "../../utils/jwt";
import { BarangaySecretaryService } from "../../services/barangay-secretary.service";

const service = new BarangaySecretaryService();

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthenticated" });
    }

    const payload = jwtUtil.verify(token);
    if (!payload) {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        });
        return res.status(401).json({ message: "Unauthenticated" });
    }

    const user = await service.getBarangaySecretaryById(payload.id);

    if (!user) {
        return res.status(401).json({ message: "Unauthenticated" });
    }

    req.user = user;

    next();
};
