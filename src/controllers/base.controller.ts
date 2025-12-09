import { ActivityLogService } from "../services/activity-log.service";
import type { CreateActivityLog } from "../types/requests";
import type { Request, Response } from "express";

const logService = new ActivityLogService();

export class BaseController {
    constructor() { }
    

    async logActivity(title: string, barangay_secretary_id: string, description?: string) {
        const result = await logService.createActivityLog({
            title: title,
            description: description,
            barangay_secretary_id: barangay_secretary_id
        } as CreateActivityLog);

        return result;
    }
}