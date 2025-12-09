import * as yup from "yup";
import { formatYupErrors } from "../../utils/yup-validation";
import type { NextFunction, Request, Response } from "express";

const createServiceSchema = yup.object().shape({
    name: yup.string().required("Service name is required"),
    description: yup.string().optional()
})

export const validateCreateService = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await createServiceSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (err: any) {
        return res.status(400).json({
            errors: formatYupErrors(err)
        });
    }
}