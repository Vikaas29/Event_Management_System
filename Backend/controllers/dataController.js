
import eventsData from "../models/dataModel.js";
import { io } from "../server.js";

export async function addEvent(req,res){

    const {email,data}=req.body;

    try{
        const note = new eventsData({
            email , data
        });

        const x= note.save();

        res.status(201).json("Event added");
    }
    catch(err){
        res.status(500).send(err)
    }
}

export async function getEvents(req,res){

    const id=req.params.id;

    try{
        let xyz;
        if(id=="all"){xyz=await eventsData.find()}
        else { xyz = await eventsData.find({"email":id})}

        res.status(201).json({data:xyz});
    }
    catch(err){
        res.status(500).send(err)
    }
}

export async function deleteEvent(req,res){

    const {id}=req.body
    try{
        
        const xyz= await eventsData.deleteOne({_id:id})

        res.status(200).json({data:xyz,message:"success"});
    }
    catch(err){
        res.status(500).send(err)
    }
}

export async function editEvent(req,res){

    const {id,email,data}=req.body
    try{
        
        const xyz= await eventsData.updateOne({_id:id},{data:data});

        res.status(200).json("success");
    }
    catch(err){
        res.status(500).send(err)
    }
}

export async function addremovepeople(req,res){
    const {id,isInterested,newEmail}=req.body
    try{
        const data=await eventsData.findOne({_id:id});

        if(isInterested==true){
            data.data.people.push(newEmail);
            io.to(room).emit('receive_message',`${newEmail} is interested in ${data.data.title}`);
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
}