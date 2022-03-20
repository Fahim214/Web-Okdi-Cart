import express from "express";
import { getAllProduct } from "../controllers/productController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.route("/").get(getAllProduct).post(protect, admin)

export default router