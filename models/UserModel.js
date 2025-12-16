const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please input your password"]
    },

    cartList: {
        type: Array
    },
    orderList: {
        type: Array
    },
    isAdmin: {
        type: Boolean
    }
},
{
    timestamp: true
})

module.exports = mongoose.model("User", UserSchema)