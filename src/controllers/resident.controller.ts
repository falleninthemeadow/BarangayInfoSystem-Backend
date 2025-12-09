import type { Request, Response } from "express";
import { ResidentService } from "../services/resident.service";
import { logActivity } from "../utils/logger";

const service = new ResidentService();

export class ResidentController {
    async getAll(req: Request, res: Response) {
        try {
            const residents = await service.getResidents()
            await logActivity("Retrieved all residents", req.user.id);
            return res.status(200).json({
                message: "Successfully retrieved residents",
                data: residents
            })
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const resident = await service.getResidentById(req.params.id || "")
            await logActivity(`Retrieved resident with id ${req.params.id}`, req.user.id);
            if (!resident) {
                return res.status(404).json({ message: "Not found" });
            }
            
            return res.status(200).json({
                message: "Successfully retrieved resident",
                data: resident
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const resident = await service.createResident({
                ...req.body,
                birth_date: new Date(req.body.birth_date)
            })
            await logActivity(`Created resident with id ${resident.id}`, req.user.id);
            return res.status(201).json({
                message: "Successfully created resident",
                data: resident
            })
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const resident = await service.updateResident(req.params.id || "", {
                ...req.body,
                birth_date: new Date(req.body.birth_date)
            })
            await logActivity(`Updated resident with id ${req.params.id}`, req.user.id);
            return res.status(200).json({
                message: "Successfully updated resident",
                data: resident
            })
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await service.deleteResident(req.params.id || "")
            await logActivity(`Deleted resident with id ${req.params.id}`, req.user.id);
            return res.status(200).json({
                message: "Successfully deleted resident",
            })
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}