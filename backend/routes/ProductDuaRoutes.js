import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getAllProduct,
  getSingleproduct,
  getTopProducts,
  updateProduct,
} from "../controllers/ProductDuaController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAllProduct).post(protect, admin, createProduct);
router.route("/top").get(getTopProducts)
router
  .route("/:id")
  .get(getSingleproduct)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);
router.route("/:id/reviews").post(protect, createProductReview);

export default router;
