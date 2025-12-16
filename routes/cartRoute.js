const express = require("express");
const router = express.Router();
const   {addToCart,
    removeFromCart,
    clearCart,
    getUserCart} = require("../controllers/cartController")
    const { protect } = require("../middleware/authMiddleware")

router.post("/addToCart", protect, addToCart);
router.delete("/removeFromCart", protect, removeFromCart);
router.delete("/clearCart", protect, clearCart);
router.get("/getUserCart", protect, getUserCart);

module.exports = router