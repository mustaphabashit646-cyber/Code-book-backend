const express = require("express")
const router = express.Router()
const { protect } = require("../middleware/authMiddleware")
const { registerUser, registerAdmin, loginUser, logoutUser, getUserProfile, loginStatus } = require("../controllers/userController")


router.post("/registerUser", registerUser)
router.post("/login", loginUser)
router.post("/registerAdmin", registerAdmin)
router.post("/logout", logoutUser)
router.get("/getUserProfile", protect, getUserProfile)
router.get("/loginStatus", loginStatus)

module.exports = router
