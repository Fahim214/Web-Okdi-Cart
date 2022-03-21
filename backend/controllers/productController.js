import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// Get All Product /api/products
export const getAllProduct = asyncHandler(async (req, res) => {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
    ? {
        name: {
            $regex: req.query.keyword,
            $options: "i",
        },
    }
    : {};

    const count = await Product.countDocuments({...keyword});
    const products = await Product.find({...keyword})
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    
    res.status(201).json({
        success: true,
        products,
        page,
        pages: Math.ceil(count / pageSize)
    })
})


// get single product => /api/products/:id
export const getSingleproduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(!product) {
        res.status(401)
        throw new Error("Product Not Found")
    }

    res.status(201).json({
        success: true,
        product
    })
})


// Create Product
export const createProduct = asyncHandler(async(req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        brand: req.body.brand,
        category: req.body.category,
        countInStock: req.body.countInStock,
        numReviews: 0,
        image: req.body.image || "/images/simple.jpg",
        user: req.user._id
    })

    const createdProduct = await product.save();

    res.status(201).json({
        success: true,
        product: createdProduct
    })
})


// Update Product => /api/products/:id POST
export const updateProduct = asyncHandler(async (req, res) => {
    let product = await Product.findById(req.params.id);

    if(product) {
        product.name= req.body.name,
        product.description= req.body.description,
        product.price= req.body.price,
        product.brand= req.body.brand,
        product.category= req.body.category,
        product.countInStock = req.body.countInStock,
        product.numReviews = req.body.numReviews,
        product.image = req.body.image || "/images/simple.jpg"

        const updatedProduct = await product.save()

        res.status(201).json({
            success: true,
            product: updatedProduct
        })
    } else{
        res.status(401)
        throw new Error("Product Not Found")
    }
})


// Create new review => /api/products/:id/reviews
export const createProductReview = asyncHandler(async (req, res) => {
    const {rating, comment} = req.body;

    let product = await Product.findById(req.params.id);

    if(product){
        const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString()
        
        )

        if(alreadyReviewed){
            res.status(401);
            throw new Error("Already Reviewed")
        }
    
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        }
    
        product.reviews.push(review)
    
        product.numReviews = product.reviews.length;
    
        product.rating = 
            product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
        
        await product.save()
    
        res.status(201).json({
            message: "Review Added"
        })
    } else {
        res.status(401);
        throw new Error("Product Not Found")
    }
})


// Delete product => /api/products/:id
export const deleteProduct = asyncHandler(async (req, res) => {
    let product = await Product.findById(req.params.id)

    if(!product) {
        res.status(401)
        throw new Error("Product not found")
    }

    await Product.findByIdAndDelete(req.params.id)
    res.status(201).json({ message: "Product Deleted"})
})


// Get Top Product => /api/products/top
export const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3)

    res.status(201).json({
        success: true,
        products
    })
})