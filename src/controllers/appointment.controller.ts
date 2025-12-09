import type { Request, Response } from "express";
import { AppointmentService } from "../services/appointment.service";

const service = new AppointmentService();

export class AppointmentController {
    async getAll(req: Request, res: Response) {
        await service.getAppointments().then((result) => {
            res.status(200).json({
                message: "Successfully retrieved appointments",
                data: result
            });
        }).catch((error) => {
            res.status(500).json(error);
        })
    }

    async getById(req: Request, res: Response) {
        await service.getAppointmentById(req.params.id || "").then((result) => {
            res.status(200).json({
                message: "Successfully retrieved appointment",
                data: result
            });
        }).catch((error) => {
            res.status(404).json(error);
        })
    }

    async create(req: Request, res: Response) {
        await service.createAppointment(req.body).then((result) => {
            res.status(201).json({
                message: "Successfully created appointment",
                data: result
            });
        }).catch((error) => {
            res.status(500).json(error);
        })
    }

    async update(req: Request, res: Response) {
        await service.updateAppointment(req.params.id || "", req.body).then((result) => {
            res.status(200).json({
                message: "Successfully updated appointment",
                data: result
            });
        }).catch((error) => {
            res.status(500).json(error);
        })
    }

    async delete(req: Request, res: Response) {
        await service.deleteAppointment(req.params.id || "").then((result) => {
            res.status(200).json({
                message: "Successfully deleted appointment",
                data: result
            });
        }).catch((error) => {
            res.status(500).json(error);
        })
    }
}