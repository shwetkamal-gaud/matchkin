import { Router } from "express";
import { getMessages } from "../controllers/chat.controller";
import { authenticate } from "../middleware/auth.middleware";
const router = Router();

router.get("/:userId", authenticate, getMessages);
export default router;
