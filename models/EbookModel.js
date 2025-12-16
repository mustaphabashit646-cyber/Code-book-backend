const mongoose = require("mongoose")

const EbookSchema = new mongoose.Schema({

    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    overview: {
        type: String,
        required: false
    },
    long_Description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    poster: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    inStock: {
        type: Boolean,
        default: false
    },
    size: {
        type: Number,
        required: false
    },
    bestSeller: {
        type: Boolean,
        default: false
    }
},
{
    timestamp: true
})

module.exports = mongoose.model("Ebook", EbookSchema)