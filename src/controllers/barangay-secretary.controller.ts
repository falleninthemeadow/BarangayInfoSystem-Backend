import type { Request, Response, NextFunction } from "express";
import { BarangaySecretaryService } from "../services/barangay-secretary.service";
import { hashPassword } from "../utils/hash";
import { logActivity } from "../utils/logger";

const service = new BarangaySecretaryService();

export class BarangaySecretaryController {
    async getAll(req: Request, res: Response) {
        try {
            const barangaySecretaries = await service.getAllBarangaySecretaries();
            await logActivity("Retrieved all barangay secretaries", req.user.id);
            return res.status(200).json({
                message: "Successfully retrieved barangay secretaries",
                data: barangaySecretaries
            });
        } catch (error) {
            return res.status(500).json(error);
        }
        
    }

    async getById(req: Request, res: Response) {
        try {
            const barangaySecretary = await service.getBarangaySecretaryById(req.params.id || "")
            await logActivity(`Retrieved barangay secretary with id ${req.params.id}`, req.user.id);
            if (!barangaySecretary) {
                return res.status(404).json({ message: "Not found" });
            }
            return res.status(200).json({
                message: "Successfully retrieved barangay secretary",
                data: barangaySecretary
            })
        } catch (error) {
            return res.status(500).json(error);
        }

    }

    async create(req: Request, res: Response) {
        try {
            const password = await hashPassword(req.body.password);
            const barangaySecretary = await service.createBarangaySecretary({
                ...req.body,
                password
            })
            await logActivity(`Created barangay secretary with id ${barangaySecretary.id}`, req.user.id);
            return res.status(201).json({
                message: "Successfully created barangay secretary",
                data: barangaySecretary
            })
        } catch (error) {
            return res.status(500).json(error);
        }
       
    }

    async update(req: Request, res: Response) {
        try {
            const password = await hashPassword(req.body.password);
            const updated = await service.updateBarangaySecretary(req.params.id || "", {
                ...req.body,
                password
            })
            await logActivity(`Updated barangay secretary with id ${req.params.id}`, req.user.id);
            return res.status(200).json({
                message: "Successfully updated barangay secretary",
                data: updated
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            if (req.user.id === req.params.id) {
                return res.status(400).json({ message: "You cannot delete yourself" });
            }
            await service.deleteBarangaySecretary(req.params.id || "")
            await logActivity(`Deleted barangay secretary with id ${req.params.id}`, req.user.id);
            return res.status(200).json({
                message: "Successfully deleted barangay secretary",
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}