import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  getSearchSuggestions,
  search,
  updateProduct,
} from "../controllers/productController.js";
import verifyJwt from "../middleware/verifyJwt.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:ids", getProductById);
router.get("/search/:query", search);
router.get("/search/suggestions/:query", getSearchSuggestions);
router.post("/", verifyJwt, createProduct);
router.put("/:id", verifyJwt, updateProduct);
router.delete("/:id", verifyJwt, deleteProduct);

export default router;
