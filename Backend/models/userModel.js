import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    "userName":{type:String,required:true},
    "email":{type:String,required:true,unique:true},
    "password":{type:String,required:true},
});

const user =mongoose.model("EventsAppUser",userSchema);

export default user;