import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";
import { getUsers } from "../controllers/user.controller";
const router = Router();

router.get('/', authenticate, getUsers)
export default router;