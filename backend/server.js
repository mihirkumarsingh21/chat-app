import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectToMongoDB from "./db/connectToMongoDB.js";
import cors from "cors";



import authRoutes from "./routes/auth.routes.js";
import messageRoute from "./routes/message.routes.js"
import userRoute from "./routes/user.routes.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoute);
app.use("/api/users", userRoute);


connectToMongoDB(); 


app.listen(PORT, () => {
    console.log(` Server is running at:  http://localhost:${PORT}`);
})