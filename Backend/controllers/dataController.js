import eventsData from "../models/dataModel.js";

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
        if(id=="all"){await eventsData.find()}
        else {await eventsData.find({"email":id})}

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