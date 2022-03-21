import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// Login user => /api/users/login
export const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({ email })

    if(user && (await user.matchPassword(password))) {
        res.status(201).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            },
        })
    } else {
        res.status(401)
        throw new Error("Invalid Email or User")
    }
})


// Get useer profile => /api/users/profile
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if(user) {
        res.status(201).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            }
        })
    } else {
        res.status(401)
        throw new Error("User not found")
    }
})

// Register User => /api/users/register
export const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body;

    const userExist = await User.findOne({ email })

    if(userExist) {
        res.status(401);
        throw new Error("User Already Exist")
    }

    const user = await User.create({ name, email, password })

    res.status(201).json({
        success: true,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        }
    })
})


// Update User Profile => /api/users/profile
export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error("User Not Found")
    }

    const updatedUserProfile = await User.findByIdAndUpdate(
        req.user.id,
        {
            name: req.body.name || user.name,
            email: req.body.email || user.email,
            password: req.body.password || user.password,
        },
        {
            new: true,
            runValidators: true
        }
    )

    res.status(201).json({
        success: true,
        user: {
            _id: updatedUserProfile._id,
            name: updatedUserProfile.name,
            email: updatedUserProfile.email,
            isAdmin: updatedUserProfile.isAdmin,
            token: generateToken(updatedUserProfile._id)
        }
    })
})


// Get User => /api/users
export const getUser = asyncHandler(async(req, res) => {
    const users = await User.find({})
    res.status(201).json({ success: true, users})
})


// Delete User => /api/users/:id
export const deleteUser = asyncHandler(async(req, res) => {
    let user = await User.findById(req.params.id)

    if(!user) {
        res.status(401);
        throw new Error("User not found")
    }

    await user.remove();
    res.status(201).json({ message: "User removed"})
})



// Get user by id => /api/users/:id
export const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(!user) {
        res.status(401);
        throw new Error("User not found")
    }

    res.status(201).json({ success: true, user })
})


// Update user => /api/users/:id
export const updateUser = asyncHandler(async(req, res) => {
    let user = await User.findById(req.params.id)

    if(user){
        user.name= req.body.name || user.name,
        user.email= req.body.email || user.email,
        user.isAdmin= req.body.isAdmin;

        const updatedUser = await user.save()

        res.status(201).json({
            success: true,
            user: updatedUser
        })
    } else {
        res.status(401)
        throw new Error("User Not Found")
    }
})