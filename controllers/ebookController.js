const Ebook = require("../models/EbookModel")
const asyncHandler = require("express-async-handler")
const { generateUniqueId } = require("../utils")

//create an ebook 

const createEbook = asyncHandler(async (req, res) => {
    const { name, overview, longDescription, price, inStock, poster, rating, 
        bestSeller, size } = req.body;

        const existing = await Ebook.findOne({name})
        if (existing) {
         return   res.status(400).json({message: "Ebook with this name already exist"})
        }

        if(!name || !overview || !longDescription || !price  || !rating || ! size) {
         return  res.status(400).json({message: "All fieldss are required"})
          }


        if(rating < 1 || rating > 5) {
         return   res.status(400).json({message: "Rating can only be between 1-5"})
        }

        const id = await generateUniqueId()

        const ebook = new Ebook({
           id,
           name,
           overview,
           longDescription,
           price,
           rating,
           poster,
           bestSeller: bestSeller || false,
           inStock: inStock || true,
           size
        })

        const savedEbook = await ebook.save()

        res.status(201).json(savedEbook)
})


const getAnEbook = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const ebook = await Ebook.findOne({id});

    if(ebook) {
        const {_id, id, name, overview, longDescription, price, poster, rating, inStock, bestSeller, size} = ebook;

        res.status(200).json({_id, id, name, overview, longDescription, price, poster, rating, inStock, bestSeller, size})

    }else{
         return   res.status(404).json({message: "Ebook not found"})
    }
})

const getAllEbooks = asyncHandler(async( req,res) => {
          
    const ebooks = await Ebook.find();

    if(!ebooks){
         return  res.status(404).json({message: 'No Ebook found'})
    };
   return res.status(200).json(ebooks)

})


const updateEbook = asyncHandler(async( req, res) => {

    const {id} = req.params;    
    try{
        const ebook = await Ebook.findOne({id});

        if(ebook){
            ebook.price = req.body.price || ebook.price;
            ebook.poster = req.body.poster || ebook.poster;
            ebook.overview = req.body.overview || ebook.overview;
            ebook.rating = req.body.rating || ebook.rating;
            ebook.inStock = req.body.inStock || ebook.inStock;
            ebook.bestSeller = req.body.bestSeller || ebook.bestSeller;
            ebook.longDescription = req.body.longDescription || ebook.longDescription;

            const updateEbook = await ebook.save();
            res.status(200).json(updateEbook)
        } else{
           res.status(404).json({error: "Ebook not found"})
        }
    } catch (error) {
    res.status(500).json({error: "Internal server Error"})
    }
})

module.exports ={
    createEbook,
    updateEbook,
    getAllEbooks,
    getAnEbook
}