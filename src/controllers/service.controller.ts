import type { Request, Response } from "express";
import { ServiceService } from "../services/service.service";

const service = new ServiceService();

export class ServiceController {
    async getAll(req: Request, res: Response) {
        try {
            const services = await service.getServices()
            return res.status(200).json({
                message: "Successfully retrieved services",
                data: services
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const _service = await service.getServiceById(req.params.id || "")
            if (!_service) {
                return res.status(404).json({ message: "Not found" });
            }
            
            res.status(200).json({
                message: "Successfully retrieved service",
                data: _service
            });
        } catch(error) {
            res.status(500).json(error);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const _service = await service.createService(req.body)
            res.status(201).json({
                message: "Successfully created service",
                data: _service
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const _service = await service.updateService(req.params.id || "", req.body)
            res.status(200).json({
                message: "Successfully updated service",
                data: _service
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await service.deleteService(req.params.id || "")
            res.status(200).json({
                message: "Successfully deleted service",
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}