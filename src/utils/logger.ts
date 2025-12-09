import { ActivityLogService } from "../services/activity-log.service";
import type { CreateActivityLog } from "../types/requests";

const logService = new ActivityLogService();

export const logActivity = async (title: string, userID: string | number, description?: string) => {
    console.log(`LOG: User ${userID} - ${title} - ${description}`);
    const result = await logService.createActivityLog({
        title: title,
        description: description,
        barangay_secretary_id: userID
    } as CreateActivityLog);

    return result;
}