import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrder,
  getOrders,
  updateOrderToDeliver,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, admin, getOrders).post(protect, addOrderItems);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrder);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDeliver);

export default router;
