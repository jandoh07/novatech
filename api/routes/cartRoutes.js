import express from "express";
import {
  addToCart,
  clearCart,
  removeFromCart,
} from "../controllers/cartController.js";
import verifyJwt from "../middleware/verifyJwt.js";

const router = express.Router();

router.post("/:id", verifyJwt, addToCart);
router.delete("/:id", verifyJwt, removeFromCart);
router.delete("/", verifyJwt, clearCart);

export default router;
