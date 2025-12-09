import type { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { formatYupErrors } from "../../utils/yup-validation";
import { ResidentService } from "../../services/resident.service";
import { ServiceService } from "../../services/service.service";

const residentService = new ResidentService();
const serviceService = new ServiceService();

const updateAppointmentSchema = yup.object().shape({
  resident_id: yup.string().nullable().optional().test("resident-exists", "Resident does not exist", async (resident_id) => {
        if (!resident_id) return true;
        const resident = await residentService.getResidentById(resident_id);
        return !!resident;
    }),

  service_id: yup.string().nullable().optional().test("service-exists", "Service does not exist", async (service_id) => {
        if (!service_id) return true;
        const service = await serviceService.getServiceById(service_id);
        return !!service;
    }),

  appointment_datetime: yup.string().nullable().optional().matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,"Appointment Date and Time must be in format YYYY-MM-DDTHH:mm").test("valid-datetime", "Appointment is invalid", (value) => {
        if (!value) return true;
        return !isNaN(Date.parse(value));
    }),
});


export const validateUpdateAppointment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await updateAppointmentSchema.validate(req.body);
        next();
    } catch (error: any) {
        return res.status(400).json(formatYupErrors(error));
    }
};