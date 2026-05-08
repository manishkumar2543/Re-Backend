import { Router } from "express";
import { validateRegister, validateLogin } from "../validators/auth.validator.js";
import { register, emailVarify, login,getMe } from "../controllers/auth.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/register",validateRegister,register );
router.get("/verify-email",emailVarify);
router.post("/login",validateLogin,login);
router.get("/get-me",authUser,getMe);

export default router;
