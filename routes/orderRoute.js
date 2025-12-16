const express = require("express");
const router = express.Router();
const {placeOrder, getUserOrders, getOrderById} = require("../controllers/orderController")
const { protect } = require("../middleware/authMiddleware")

router.post("/placeOrder", protect, placeOrder);
router.get("/getUserOrders", protect, getUserOrders)
router.get("/getOrderById/:id", protect, getOrderById)

module.exports = router