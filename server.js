import app from "./src/app.js";
import MongoIndentify from "./src/config/db.js";
import Env from "./src/config/env.js";

const startServer = async () => {
    await MongoIndentify.connect();
    app.listen(Env.hostUrl, () => {
        console.log(`Server is running on port ${Env.hostUrl}`);
    });
};

startServer();