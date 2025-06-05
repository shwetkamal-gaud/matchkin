import { Router } from "express";
import { getMessages, sendMessage } from "../controllers/message.controller";
import { authenticate } from "../middleware/auth.middleware";
const router = Router();

router.get("/:id", authenticate, getMessages);
router.post("/send/:id", authenticate, sendMessage)
export default router;
