import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import verifyJwt from "../middleware/verifyJwt.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", verifyJwt, createProduct);
router.put("/:id", verifyJwt, updateProduct);
router.delete("/:id", verifyJwt, deleteProduct);

export default router;
