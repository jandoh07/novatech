import express from "express";
import {
  addToCart,
  clearCart,
  getCartProducts,
  removeFromCart,
} from "../controllers/cartController.js";
import verifyJwt from "../middleware/verifyJwt.js";

const router = express.Router();

router.post("/:id", verifyJwt, addToCart);
router.post("/", verifyJwt, getCartProducts);
router.delete("/:id", verifyJwt, removeFromCart);
router.delete("/", verifyJwt, clearCart);

export default router;
