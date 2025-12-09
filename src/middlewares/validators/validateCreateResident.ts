import type { Request, Response, NextFunction } from "express"; 
import * as yup from "yup";
import { formatYupErrors } from "../../utils/yup-validation";

const createResidentSchema = yup.object().shape({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    middle_name: yup.string().optional(),
    birth_date: yup.string().required("Birthdate is required").matches(/^\d{4}-\d{2}-\d{2}$/, "Birthdate must be in YYYY-MM-DD format").test("valid-date", "Birthdate is invalid", (value) => {
        return !isNaN(Date.parse(value!));
    }),
    address: yup.string().required("Address is required"),
    contact_number: yup.string().required("Contact number is required").test(
        "valid-contact-number",
        "Contact number must start at +63",
        (contact_number: string) => {
            return contact_number.startsWith("+63");
        }
    ).min(13, "Contact number must be at least 13 characters").max(13, "Contact number must be at most 13 characters"),
    sex: yup.string().oneOf(["MALE", "FEMALE"], "Sex must be MALE or FEMALE").required("Sex is required"),
})

export const validateCreateResident = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await createResidentSchema.validate(req.body, { abortEarly: false });
        next();
    } catch (err: any) {
        return res.status(400).json({
            errors: formatYupErrors(err)
        });
    }
}