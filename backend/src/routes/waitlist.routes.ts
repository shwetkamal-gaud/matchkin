import { Router } from "express";
import { submitClientOnboarding } from "../controllers/waitlist.controller";
const router = Router();

router.post('/', submitClientOnboarding);
export default router;
