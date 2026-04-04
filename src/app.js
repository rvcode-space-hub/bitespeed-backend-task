import express from "express";
import cors from 'cors'
import identifyRouter from "./routers/identify.router.js";
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/v1", identifyRouter);

export default app;