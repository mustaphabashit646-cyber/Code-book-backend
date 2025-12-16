const mongoose = require("mongoose");
const UserModel = require("./UserModel")

const CartSchema = new mongoose.Schema({
    userId: {
        
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true, 

    },

    cartList: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model("Cart", CartSchema)