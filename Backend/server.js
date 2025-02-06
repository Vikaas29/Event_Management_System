import express from "express";
import mongoose from "mongoose";

import http from "http";
import {Server} from "socket.io"

import cors from 'cors';
import { userRoutes } from "./routes/userRoutes.js";

import dotenv from 'dotenv';
import { dataRoutes } from "./routes/dataRoutes.js";

dotenv.config();

const app=new express();
const server=http.createServer(app);


const io=new Server(server); 
//we can also put here another parameter object for cors related data

app.use(cors());
app.use(express.json());

// const router= express.Router();
mongoose.connect(process.env.MONGO_PASSWORD);

const db=mongoose.connection;

db.on("open",()=>{
    console.log("connection success");
});
db.on("error",()=>{
    console.log("connection unsuccess");
});

server.listen(4000,()=>{
    console.log("server is running at port 4000");
});

io.on("connection",(socket)=>{
    console.log("user connected " + socket.id);

    //to emit data to room specific user/users
    socket.on("join_room",(data)=>{
        socket.join(data);
    })
    socket.on("send_message",(data)=>{
        socket.to(data.room).emit("recieve_message",data);   
    })

    // socket.on("send_message",(data)=>{
    //     // to emit this recieved with tag send_messege to everyone except sender
    //     socket.broadcast.emit("recieve_message",data);   
    // })
})


userRoutes(app);

dataRoutes(app);


