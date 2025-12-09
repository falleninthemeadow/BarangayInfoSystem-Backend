import type { Request, Response, NextFunction } from "express"; 
import * as yup from "yup";
import { formatYupErrors } from "../../utils/yup-validation";

const updateResidentSchema = yup.object().shape({
    first_name: yup
        .string()
        .optional()
        .min(1, "First name is required"),

    last_name: yup
        .string()
        .optional()
        .min(1, "Last name is required"),

    middle_name: yup.string().optional(),

    birth_date: yup
        .string()
        .nullable()
        .optional()
        .matches(/^\d{4}-\d{2}-\d{2}$/, "Birthdate must be in YYYY-MM-DD format")
        .test("valid-date", "Birthdate is invalid", (value) => {
            if (!value) return true; // allow missing
            return !isNaN(Date.parse(value));
        }),

    address: yup
        .string()
        .optional()
        .min(1, "Address is required"),

    contact_number: yup
        .string()
        .nullable()
        .optional()
        .test(
            "valid-contact-number",
            "Contact number must start at +63",
            (contact_number) => {
                if (!contact_number) return true; // allow missing
                return contact_number.startsWith("+63");
            }
        )
        .min(13, "Contact number must be at least 13 characters")
        .max(13, "Contact number must be at most 13 characters"),

    sex: yup
        .string()
        .oneOf(["MALE", "FEMALE"], "Sex must be MALE or FEMALE")
        .optional(),
});

export const validateUpdateResident = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await updateResidentSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (err: any) {
        return res.status(400).json({
            errors: formatYupErrors(err)
        });
    }
}