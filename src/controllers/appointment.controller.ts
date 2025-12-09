import type { Request, Response } from "express";
import { AppointmentService } from "../services/appointment.service";
import { logActivity } from "../utils/logger";

const service = new AppointmentService();

export class AppointmentController {
    async getAll(req: Request, res: Response) {
        try {
            const appointments = await service.getAppointments()

            await logActivity("Retrieved all appointments", req.user.id);
            return res.status(200).json({
                message: "Successfully retrieved appointments",
                data: appointments
            })
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const appointment = await service.getAppointmentById(req.params.id || "")
            if (!appointment) {
                return res.status(404).json({ message: "Not found" });
            }
            await logActivity(`Retrieved appointment with id ${req.params.id}`, req.user.id);
            return res.status(200).json({
                message: "Successfully retrieved appointment",
                data: appointment
            })
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const appointment = await service.createAppointment({
                ...req.body,
                appointment_datetime: new Date(req.body.appointment_datetime)
            })
            await logActivity(`Created appointment with id ${appointment.id}`, req.user.id);

            return res.status(201).json({
                message: "Successfully created appointment",
                data: appointment
            })
        } catch (error) {
            return res.status(500).json(error);
        }
        
    }

    async update(req: Request, res: Response) {
        try {
            const appointment = await service.updateAppointment(req.params.id || "", {
                ...req.body,
                appointment_datetime: new Date(req.body.appointment_datetime)
            })
            await logActivity(`Updated appointment with id ${req.params.id}`, req.user.id);

            return res.status(200).json({
                message: "Successfully updated appointment",
                data: appointment
            })
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await service.deleteAppointment(req.params.id || "")
            await logActivity(`Deleted appointment with id ${req.params.id}`, req.user.id);
            return res.status(200).json({
                message: "Successfully deleted appointment"
            })
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}