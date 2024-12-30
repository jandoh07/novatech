import express from "express";
import { search } from "../controllers/searchController.js";

const router = express.Router();

router.get("/:query", search);

export default router;
