import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import path from "path"
import morgan from "morgan"
import connectDatabase from "./config/db.js"
import bodyParser from "body-parser";

import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import productDuaRoutes from "./routes/ProductDuaRoutes.js"

const app = express()

dotenv.config({path: 'backend/config/config.env'})

connectDatabase()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

if(process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

// Routes
app.use("/api/products", productRoutes)
app.use('/api/product-dua', productDuaRoutes)
app.use("/api/users", userRoutes)
app.use('/api/orders', orderRoutes)
app.use("/api/upload", uploadRoutes)


app.get("/api/config/paypal", (req, res) => {
    res.status(201).send(process.env.PAYPAL_CLIENT_ID)
})


const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "frontend", "build", "index.html")))
} else {
    app.get("/api", (req, res) => {
        res.status(201).json({
            success: true, 
            message: "Welcome Cloth Shop App"
        })
    })
}


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5500

app.listen(PORT, console.log(`Server is running on port ${PORT}`))