import express from "express";
import {
  getSearchSuggestions,
  search,
} from "../controllers/searchController.js";

const router = express.Router();

router.get("/:query", search);
router.get("/suggestions/:query", getSearchSuggestions);

export default router;
