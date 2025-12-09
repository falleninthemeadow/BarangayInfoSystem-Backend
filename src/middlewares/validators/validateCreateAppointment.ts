import type { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { formatYupErrors } from "../../utils/yup-validation";
import { ResidentService } from "../../services/resident.service";
import { ServiceService } from "../../services/service.service";

const residentService = new ResidentService();
const serviceService = new ServiceService();

const createAppointmentSchema = yup.object().shape({
    resident_id: yup.string().required("Resident is required").test(
        "resident-exists",
        "Resident does not exist",
        async (resident_id: string) => {
            const resident = await residentService.getResidentById(resident_id);
            return !!resident;
        }
    ),
    service_id: yup.string().required("Service is required").test(
        "service-exists",
        "Service does not exist",
        async (service_id: string) => {
            const service = await serviceService.getServiceById(service_id);
            return !!service;
        }
    ),
    appointment_datetime: yup.string().required("Appointment Date is required").matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, "Appointment Date and Time must be in format YYYY-MM-DDTHH:mm").test("valid-datetime", "Appointment is invalid", (value) => {
        if (!value) return false;
        return !isNaN(Date.parse(value!));
    })
});

export const validateCreateAppointment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await createAppointmentSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (error: any) {
        return res.status(400).json({
            errors: formatYupErrors(error)
        });
    }
};