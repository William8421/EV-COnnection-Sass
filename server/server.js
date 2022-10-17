import express from "express";
import cors from "cors";
import "dotenv/config";

import userRouter from "./routes/userRouter.js";
import messagesRouter from "./routes/messagesRouter.js"
import mapRouter from "./routes/mapRouter.js";

/* import path from "path" */

import connectDB from "./helpers/dbConnect.js"
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";



const app = express();
const PORT = process.env.PORT || 5007;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, "../client/build")))

app.use(cors());
app.use(express.json());


/* --- DATABASE --- */
connectDB()
mongoose.connection.on("open", ()=>{
    console.log("db is connected")
})

mongoose.connection.on("error", (error)=>{
    console.log("Connection to MongoDB has failed", error.message)
})

/* --------------- */

app.use("/user", userRouter)
app.use("/messages", messagesRouter)
app.use("/openMaps", mapRouter)

app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "../client", "build", "index.html" ))
})

app.listen(PORT, (req, res) => console.log("Listening at port:", PORT));
