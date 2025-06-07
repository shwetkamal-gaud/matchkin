import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { addUserToGroup, createGroup, removeUserFromGroup } from "../controllers/groupChat.controller";
const router = Router();

router.post('/', authenticate, createGroup);
router.put('/add', authenticate, addUserToGroup);
router.put('/remove', authenticate, removeUserFromGroup);
export default router;