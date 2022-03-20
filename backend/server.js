import express from "express";
import dotenv from "dotenv"
import morgan from "morgan"
import cors from "cors"
import connectDatabase from "./config/db.js"

const app = express()

dotenv.config({path: 'backend/config/config.env'})

connectDatabase()

app.use(cors())
app.use(express.json())

if(process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}


const PORT = process.env.PORT || 5500

app.listen(PORT, console.log(`Server is running on port ${PORT}`))