import mongoose from "mongoose";

const dataSchema = mongoose.Schema({
    "email":{type:String,required:true,},
    "data":{type:Object,required:true},
});

const eventsData =mongoose.model("EventsAppData",dataSchema);

export default eventsData;