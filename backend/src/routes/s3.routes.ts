import { Router } from "express";
import {getSignedUrl, deleteFile  } from "../controllers/s3.controller";
const router = Router();

router.post('/generate-upload-url', getSignedUrl)
export default router;