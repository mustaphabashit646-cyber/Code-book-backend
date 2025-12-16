const express = require("express")
const router = express.Router()
const { createEbook, updateEbook, getAllEbooks, getAnEbook} = require("../controllers/ebookController")
const { adminProtect } = require("../middleware/authMiddleware")

router.post("/createEbook", adminProtect, createEbook)
router.patch("/updateEbook/:id", adminProtect, updateEbook)
router.get("/getAllEbooks", getAllEbooks)
router.get("/singleEbook/:id", getAnEbook)

module.exports = router;