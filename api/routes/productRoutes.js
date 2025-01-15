import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  getProductsFromIds,
  getSearchSuggestions,
  search,
  updateProduct,
} from "../controllers/productController.js";
import verifyJwt from "../middleware/verifyJwt.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:ids", getProductById);
// router.get("/ids", async (req, res) => {
//   res.json({ message: "This route is not implemented yet" });
// });
router.get("/search/:query", search);
router.get("/search/suggestions/:query", getSearchSuggestions);
router.post("/", verifyJwt, createProduct);
router.put("/:id", verifyJwt, updateProduct);
router.delete("/:id", verifyJwt, deleteProduct);

export default router;
