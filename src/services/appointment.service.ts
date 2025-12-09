import { prisma } from "../prisma/client";
import type { CreateAppointment, UpdateAppointment } from "../types/requests";

export class AppointmentService {
    async getAppointments() {
        return await prisma.appointment.findMany({
            orderBy: {
                appointment_datetime: "asc"
            }
        });
    }

    async getAppointmentById(id: string) {
        return await prisma.appointment.findUnique({
            where: {
                id: id
            }
        });
    }

    async createAppointment(appointment: CreateAppointment) {
        return await prisma.appointment.create({
            data: appointment
        });
    }

    async updateAppointment(id: string, appointment: UpdateAppointment) {
        return await prisma.appointment.update({
            where: {
                id: id
            },
            data: appointment
        });
    }

    async deleteAppointment(id: string) {
        return await prisma.appointment.delete({
            where: {
                id: id
            }
        });
    }
}