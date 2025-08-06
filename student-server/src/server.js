import express from "express";
import mongoose from "mongoose";
import "dotenv/config"
import userRoutes from "./Routes/userRoute.js";
import studentRoutes from "./Routes/studentRouter.js";
import cors from "cors"
const app = express();

const option= {
    origin: ["http://localhost:3000","http://localhost:4200"],
    methods: ["GET", "POST", "PUT", "DELETE"], 
}
app.use(cors({origin:option}))
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Monggose connnected");  
}).catch((err) => {
    console.log(err);
    
})
app.use("/api/user", userRoutes);
app.use("/api/students", studentRoutes);


app.listen(process.env.PORT || 4000, () => {
    console.log("server running");
});
