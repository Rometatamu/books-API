import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import booksRouter from "./src/router/book.js";
import userRouter from "./src/router/user.js";
import "dotenv/config";

const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_CONNECTION)
 .then(()=>console.log("connected"))
 .catch((err)=>{
    console.log(err);
});

app.use(booksRouter);
app.use(userRouter);

app.use((req,res)=>{
    return res.status(404).json({ message: "This endpoint does not exist"});
});

app.listen(process.env.PORT,()=>{
    console.log(`Your app is started on port ${process.env.PORT}`);
});

