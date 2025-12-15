import { Router } from "express";
import { generatePosts } from "../controllers/generate.controller";

const router = Router();

router.post("/generate", generatePosts);

export default router;
