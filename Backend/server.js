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
    origin: ["https://event-management-system-eight-teal.vercel.app","http://localhost:5173"], 
    methods: ["GET", "POST"],
    transports: ['websocket', 'polling'],
    credentials: true
  },
  allowEIO3: true
}); 


app.use(cors({
    origin:["https://event-management-system-eight-teal.vercel.app","http://localhost:5173"], 
    credentials:true,       
    optionSuccessStatus:200,
 }));
app.use(express.json());

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


    socket.on("join_room",(data)=>{
        socket.join(data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
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
            io.to(data.email).emit('receive_message',`${newEmail} cancelled on ${data.data.title}`);
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


