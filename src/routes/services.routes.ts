import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth";
import { ServiceController } from "../controllers/service.controller";
import { validateCreateService, validateUpdateService } from "../middlewares/validators";

const router = Router();
const controller = new ServiceController();

router.use(authenticateJWT);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", validateCreateService, controller.create);
router.patch("/:id", validateUpdateService, controller.update);
router.put("/:id", validateUpdateService, controller.update);
router.delete("/:id", controller.delete);

export default router