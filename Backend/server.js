import express from "express";
import mongoose from "mongoose";

import http from "http";
import {Server} from "socket.io"

import cors from 'cors';
import { userRoutes } from "./routes/userRoutes.js";

import dotenv from 'dotenv';
import { dataRoutes } from "./routes/dataRoutes.js";
import eventsData from "./models/dataModel.js";

dotenv.config();

const app=new express();
const server=http.createServer(app);


const io=new Server(server,{
  cors: {
    origin: "http://localhost:5173", // React app URL
    methods: ["GET", "POST"],
    transports: ['websocket', 'polling'],
    credentials: true
  },
  allowEIO3: true
}); 
//we can also put here another parameter object for cors related data

app.use(cors({
    origin:"http://localhost:5173", 
    credentials:true,       
    optionSuccessStatus:200,
 }));
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
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });

    // socket.on("send_message",(data)=>{
    //     socket.to(data.room).emit("recieve_message",data);   
    // })

    // socket.on("send_message",(data)=>{
    //     // to emit this recieved with tag send_messege to everyone except sender
    //     socket.broadcast.emit("recieve_message",data);   
    // })
})

app.put("/editpeople",async (req,res)=>{
    
    const {id,isInterested,newEmail}=req.body
    try{
        const data=await eventsData.findOne({_id:id});

        if(isInterested==true){
            data.data.people.push(newEmail);
            io.to(data.email).emit('receive_message',`${newEmail} is interested in ${data.data.title}`);
        }
        else{
            data.data.people=data.data.people.filter(e=>!(e==newEmail));
        }

        const xyz= await eventsData.updateOne({_id:id},{data:data.data});

        res.status(200).json("success");
    }
    catch(err){
        
        res.status(500).send(err)
    }
})


userRoutes(app);

dataRoutes(app);


