import { Router } from "express";

import { AppointmentController } from "../controllers/appointment.controller";
import { validateCreateAppointment, validateUpdateAppointment } from "../middlewares/validators";
import { authenticateJWT } from "../middlewares/auth";

const router = Router();
const controller = new AppointmentController();

router.use(authenticateJWT);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", validateCreateAppointment, controller.create);
router.patch("/:id", validateUpdateAppointment, controller.update);
router.put("/:id", validateUpdateAppointment, controller.update);
router.delete("/:id", controller.delete);

export default router