import dotenv from "dotenv";
dotenv.config();

class Env {
    static port = process.env.PORT 
    static mongoUrl = process.env.MONGO_URL 
}

export default Env;