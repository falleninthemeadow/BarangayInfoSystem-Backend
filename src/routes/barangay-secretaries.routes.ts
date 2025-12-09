import { Router } from "express"
import { BarangaySecretaryController } from "../controllers/barangay-secretary.controller"
import { validateCreateBarangaySecretary, validateUpdateBarangaySecretary  } from "../middlewares/validators"
import { authenticateJWT } from "../middlewares/auth"

const router = Router()
const controller = new BarangaySecretaryController()

router.use(authenticateJWT);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", [validateCreateBarangaySecretary], controller.create);
router.patch("/:id", [validateUpdateBarangaySecretary], controller.update);
router.put("/:id", [validateUpdateBarangaySecretary],controller.update);
router.delete("/:id", controller.delete);

export default router