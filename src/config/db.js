import mongoose from "mongoose";
import Env from "./env.js";

class MongoIndentify {
    static async connect() {
        try {
            await mongoose.connect(Env.mongoUrl)
            console.log("Connected to MongoDB");
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
        }
    }
}

export default MongoIndentify;