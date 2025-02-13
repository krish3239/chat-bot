import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import {app,server } from "./lib/socket.js";

dotenv.config();
const PORT=process.env.PORT||5001;
app.use(express.json({ limit: "10mb" }));  // Increase JSON payload limit to 10MB
app.use(express.urlencoded({ limit: "10mb", extended: true })); // For form data
app.use(cookieParser());
app.use(cors({
       origin: "https://chat-bot-mpjf.onrender.com",
    credentials: true,
}
))

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
server.listen(PORT,()=>{
    console.log("server is running on port");
    connectDB();
})
