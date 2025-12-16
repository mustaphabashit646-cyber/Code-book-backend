const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const adminProtect = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.token;
    if(!token) {
       return res.status(401).json({message: "Not Authorized, no Token"})
    }

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    const user = await User.findById(decoded.id).select("-password")

    if(!user) {
       return res.status(404).json({message: "User not found"});
    }

    if(!user.isAdmin) {
       return res.status(403).json({message: "Access denied; not an admin"});
    }
    req.user = user
    next()
})

const protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.token;
    if(!token) {
        res.status(401).json({message: "Not Authorized, No token"});
    }

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    const user = await User.findById(decoded.id).select("-password")

    if(!user) {
       return res.status(404).json({message: "User not found"});
    }

    req.user = user
    next()
})

module.exports = {
    adminProtect,
    protect
}