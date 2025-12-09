import type { Request, Response } from "express";
import type { CreateBarangaySecretary } from "../types/requests";
import { AuthService } from "../services/auth.service";
import type { LoginUser } from "../types/requests/Auth";
import { jwtUtil } from "../utils/jwt";
import { hashPassword, comparePassword } from "../utils/hash";

const service = new AuthService();

export class AuthController {
    async login(req: Request, res: Response) {
        const credentials = req.body as LoginUser;

        const user = await service.getByUsername(credentials.username);

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const passwordMatch = await comparePassword(credentials.password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const token = jwtUtil.sign({
            id: user.id
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        });

        return res.status(200).json({
            message: "Successfully logged in",
            data: {
                id: user.id,
            }
        });
    }

    async register(req: Request, res: Response) {
        const body: CreateBarangaySecretary = req.body;

        const hashedPassword = await hashPassword(body.password);
        body.password = hashedPassword;

        const response = service.register(body);

        return res.status(201).json({
            message: "Successfully registered barangay secretary",
            data: response
        });
    }

    async logout(req: Request, res: Response) {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        });

        return res.status(200).json({
            message: "Successfully logged out"
        });
    }

    async getUser(req: Request, res: Response) {
        const user = await req.user;

        return res.status(200).json({
            message: "Successfully fetched user",
            data: user
        });
    }
}