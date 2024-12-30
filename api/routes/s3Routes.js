import express from "express";
import { generatePresignedUrl } from "../controllers/s3Controller.js";
import verifyJwt from "../middleware/verifyJwt.js";

const router = express.Router();

router.post("/", verifyJwt, generatePresignedUrl);

export default router;
