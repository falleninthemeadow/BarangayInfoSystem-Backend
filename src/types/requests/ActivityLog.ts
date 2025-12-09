import type { ActivityLog } from "../../../generated/prisma";

export type CreateActivityLog = Omit<ActivityLog, "id" | "created_at">
export type UpdateActivityLog = Partial<CreateActivityLog>