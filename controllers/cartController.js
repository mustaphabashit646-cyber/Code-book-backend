const Cart = require("../models/CartModel");
const asyncHandler = require("express-async-handler");
const Ebook = require("../models/EbookModel");

const addToCart = asyncHandler(async (req, res) => {

    const userId = req.user._id;
    const {id} = req.body;

    let cart = await Cart.findOne({ userId });
    const ebook = await Ebook.findOne({id});


    if(!ebook) {
        return res.status(404).json({message: "Ebook not found"})
    }

    if(!cart) {
        cart = new Cart ({
            userId,
            cartList: [ebook]
        })
    } else {

        const existingCartIndex = cart.cartList.findIndex(
            item => item.id === id
        )
        if(existingCartIndex !== -1){
           return res.status(400).json({message: "Ebook already exist in the cart"});
        } else {
            cart.cartList.push(ebook)
        }

       
    }
     const savedCart = await cart.save()
        res.status(201).json(savedCart)

})

const removeFromCart = asyncHandler(async (req, res) => {

    const userId = req.user._id;
    const {id} = req.body;

    const cart = await Cart.findOne({ userId });
   
    if(!cart){
       return res.status(404).json({message: "cart not found"});
    }
        const existingCartIndex = cart.cartList.findIndex(
            item => item.id === id
        )
        if(existingCartIndex === -1){
           return res.status(404).json({message: "Ebook not found in the cart"});
        } 

        cart.cartList.splice(existingCartIndex, 1)

        const savedCart = await cart.save();
        res.status(200).json(savedCart)
})

const clearCart = asyncHandler(async (req, res) => {
    const userId = req.user._id

    let cart = await Cart.findOne({userId});

    if(!cart) {
       return res.status(404).json({message: "Cart not found"});
    }

    cart.cartList = [];

    const clearedCart = await cart.save();
    res.status(200).json(clearedCart);
})

const getUserCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const cart = await Cart.findOne({userId});

    if(!cart){
       return res.status(404).json({message: "Cart not found"});
    }
    res.status(200).json(cart)
})

module.exports = {
    addToCart,
    removeFromCart,
    clearCart,
    getUserCart
}

