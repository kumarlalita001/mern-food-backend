import { Router } from "express";
import { getCurrentUser, register, updateCurrentUser } from "../controllers/user.controller";
import { jwtCheck, jwtParse } from "../middlewares/auth.middleware";
import { validateMyUserRequest } from "../middlewares/validation.middleware";

const router = Router();

router.route("/").post(jwtCheck,register);
router.route("/").put(jwtCheck,jwtParse,validateMyUserRequest,updateCurrentUser);
router.route("/").get(jwtCheck,jwtParse,getCurrentUser);

export default router;