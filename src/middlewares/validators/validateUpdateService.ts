import * as yup from "yup";
import { formatYupErrors } from "../../utils/yup-validation";
import type { NextFunction, Request, Response } from "express";

const updateServiceSchema = yup.object().shape({
    name: yup.string().optional().min(1, "Service name is required"),
    description: yup.string().optional()
})

export const validateUpdateService = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await updateServiceSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (err: any) {
        return res.status(400).json({
            errors: formatYupErrors(err)
        });
    }
}