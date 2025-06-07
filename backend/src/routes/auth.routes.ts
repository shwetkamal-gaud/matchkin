import { Router } from "express";
import { login, logout, register, requestOtp, loginWithOtp } from "../controllers/auth.controller";
const router = Router();

router.post("/signup", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/otp/request", requestOtp);
router.post("/otp/verify", loginWithOtp);
export default router;
