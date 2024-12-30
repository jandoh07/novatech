import express from "express";
import verifyJwt from "../middleware/verifyJwt.js";
import {
  addToWishlist,
  clearWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController.js";

const router = express.Router();

router.post("/:id", verifyJwt, addToWishlist);
router.delete("/:id", verifyJwt, removeFromWishlist);
router.delete("/", verifyJwt, clearWishlist);

export default router;
