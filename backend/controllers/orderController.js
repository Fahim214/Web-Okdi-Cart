import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js"

// Create new order => /api/orders POST
export const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if(orderItems && orderItems.length === 0) {
        res.status(401)
        throw new Error("No order items")
    }

    const createdOrder= await new Order({
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        taxPrice,
        shippingPrice,
        totalPrice,
    });

    await createdOrder.save()
    res.status(201).json({
        success: true,
        order: createdOrder
    })
})


// get order by id => /api/orders/:id GET
export const getOrder = asyncHandler( async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    )

    if(!order) {
        res.status(401)
        throw new Error("Order no found")
    }

    res.status(201).json({
        success: true,
        order
    })
})


// update order to paid => /api/orders/:id PUT
export const updateOrderToPaid = asyncHandler(async (req, res) => {
    let order = await Order.findById(req.params.id)

    if(!order) {
        res.status(401)
        throw new Error("Order Not Found")
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address
    }

    const updatedOrder = await order.save()

    res.status(201).json({
        success: true,
        order: updatedOrder
    })
})


// Update order to deliver => /api/orders/:id/deliver PUT
export const updateOrderToDeliver = asyncHandler(async (req, res) => {
    let order = await Order.findById(req.params.id)

    if(!order) {
        res.status(401)
        throw new Error("Order not found")
    }

    order.isDelivered = true,
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.status(201).json({
        success: true,
        message: updatedOrder
    })
})


// Get My Orders => /api/orders/myorders GET
export const getMyOrders = asyncHandler( async (req, res) => {
    const orders = await Order.find({ user: req.user.id })

    res.status(201).json({
        success: true,
        orders
    })
})


// Get All Order => /api/orders GET
export const getOrders = asyncHandler( async (req, res) => {
    const orders = await Order.find({}).populate("user", "id name")

    res.status(201).json({
        success: true,
        orders
    })
})