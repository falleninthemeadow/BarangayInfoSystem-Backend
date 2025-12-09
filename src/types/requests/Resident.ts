import type { Resident } from "../../../generated/prisma";

export type CreateResident = Omit<Resident, "id">
export type UpdateResident = Partial<CreateResident>