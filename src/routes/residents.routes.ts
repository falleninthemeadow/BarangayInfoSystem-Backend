import { Router } from "express";

import { ResidentController } from "../controllers/resident.controller";
import { validateCreateResident, validateUpdateResident } from "../middlewares/validators";
import { authenticateJWT } from "../middlewares/auth";

const router = Router();
const controller = new ResidentController();

router.use(authenticateJWT);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", validateCreateResident, controller.create);
router.patch("/:id", validateUpdateResident, controller.update);
router.put("/:id", validateUpdateResident, controller.update);
router.delete("/:id", controller.delete);

export default router