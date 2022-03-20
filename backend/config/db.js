import mongoose from "mongoose";

const connctDatabase = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Database Is Connected");
    } catch (error) {
        console.log(error.message);
    }
}

export default connctDatabase