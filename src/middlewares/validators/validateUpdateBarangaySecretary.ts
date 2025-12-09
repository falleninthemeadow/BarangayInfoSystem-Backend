import type { NextFunction, Response, Request } from "express";
import * as yup from "yup";
import { formatYupErrors } from "../../utils/yup-validation";
import { AuthService } from "../../services/auth.service";

const authService = new AuthService();

const barangaySecretarySchema = yup.object().shape({
    first_name: yup.string().optional().min(1, "First name is required"),
    last_name: yup.string().optional().min(1, "Last name is required"),
    middle_name: yup.string().optional(),
    username: yup.string().optional().min(1, "Username is required").test(
            "username-exists",
            "Username already exists",
            async (username) => {
                if (!username) {
                    return true;
                }
                const user = await authService.getByUsername(username as string);
                return !user;
            }
    ),
    email: yup.string().email("Must be a valid email").optional().min(1, "Email is required").test(
            "email-exists",
            "Email already exists",
            async (email) => {
                if (!email) {
                    return true;
                }
                const user = await authService.getByEmail(email as string);
                return !user;
            }
        ),
    password: yup.string().optional().min(1, "Password is required")
});

export const validateUpdateBarangaySecretary = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await barangaySecretarySchema.validate(req.body, { abortEarly: false });
        next();
    } catch (err: any) {
        return res.status(400).json({
            errors: formatYupErrors(err)
        });
    }
};