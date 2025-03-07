import { useState,useEffect, useContext } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { User } from "./User";
import {UserEvent} from "./UserEvent"
import { FaRegWindowClose } from "react-icons/fa";
import { MyContext } from "../App";
import { LifeLine } from "react-loading-indicators";

export function UserPage(){

    const {reloadAPI,notify}=useContext(MyContext);
    const email=localStorage.getItem("email");
    const JWT = localStorage.getItem("jwt");
    const user = localStorage.getItem("userName")
    const [file,setFile]=useState(null);
    const [eventsData,setEventsData]=useState(null);
    const [interestedList,setInterestedList]=useState({visibility:false,data:[]});
    const [addEdit,setAddEdit]=useState({visibility:false,id:null,oldData:null,isEditing:false});
    const [isCallingApi,setIsCallingApi]=useState(false);
    const [reload,setReload]=useState(false);
    const [image,setImage]=useState(null);

    useEffect(()=>{
        
        async function apifetch() {
            const response=await fetch(`https://event-management-system-9aat.onrender.com/getevents/${email}`);
            const result= await response.json();

            setEventsData(result.data);
            
        }
        apifetch();
    },[reload,reloadAPI]);
    
    useEffect(()=>{
        async function handleImageUplaod() {
            try{   
            if(!file){return;}
            const imageData=new FormData();
            imageData.append("file",file);
            imageData.append("upload_preset","Email_Builder_Preset");
            imageData.append("cloud_name","djllmrckt");
    
            const res=await fetch("https://api.cloudinary.com/v1_1/djllmrckt/image/upload",{
                method:"POST",
                body:imageData
            });
            const imageUrlData= await res.json();
    
            setImage(imageUrlData);
            notify("Image Uploaded");
    
            setFile(null);
            }
            catch(err){
                notify(err);
            }
        }
        handleImageUplaod();
    },[file])

    async function handleSaveEdit() {
       
        
        let title=document.getElementById("title").value;
        let description=document.getElementById("description").value;
        let date=document.getElementById("date").value;
        let location=document.getElementById("location").value;
        let type=document.getElementById("type").value;

        if(!title || !description || !date ||!location){
            notify("Fields are mandatory");
            return;
        }
        try {
            setIsCallingApi(true);
            
        if(addEdit.oldData){
            
            let newImage;
            if(image==null){newImage=addEdit.oldData.image}
            else{
                newImage=image;
            }
            const upload={title,description,date,location,image:newImage,type,people:addEdit.oldData.people}

            const response= await fetch("https://event-management-system-9aat.onrender.com/editevent",{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    "authorization": `JWT ${JWT}`
                },
                body: JSON.stringify({
                    id:addEdit.id,
                    email,
                    data:upload
                })
            })

            const result=await response.json();
            notify("Event Edited");
        }
        else{
            
        
            if(!image){
                notify("Fields are mandatory");
                 return; 
             }

            const upload={title,description,date,location,image,type,people:[]};

            const response= await fetch("https://event-management-system-9aat.onrender.com/addevent",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "authorization": `JWT ${JWT}`
                },
                body: JSON.stringify({
                    email,
                    data:upload
                })
            })

            const result=await response.json();
            notify("Event Created");
        }
            
        } catch (error) {
            
        }
        finally{
        setIsCallingApi(false);
        setAddEdit({visibility:false,id:null,oldData:null,isEditing:false});
        setReload(!reload)
        document.getElementById("title").value="";
        document.getElementById("description").value="";
        document.getElementById("date").value="";
        document.getElementById("location").value="";

        }
        
    }

   const deleteEvent = async (id)=> {

        try {
            const response= await fetch("https://event-management-system-9aat.onrender.com/deleteevent",{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json",
                    "authorization": `JWT ${JWT}`
                },
                body: JSON.stringify({
                    id
                })
            })

            const result=await response.json();
            notify("Event Deleted");
        } catch (error) {
            notify(error)
        }
        finally{
            setReload(!reload);
        }
        
    }

    if(!eventsData){
        return (<>
        <div className="text-3xl text-center m-5 flex">{user} : <div className="text-gray-400">My Events</div></div>
        <User></User>
        <div className="w-[100%] h-[85vh] flex justify-center items-center">
        <LifeLine color="#32cd32" size="medium" text="" textColor="" />
        </div>
        </>)
      }

    return (<>
        <div className="text-3xl text-center m-5 flex">{user} : <div className="text-gray-400">My Events</div></div>
        <User></User>

        <div className="w-[100%] flex flex-wrap justify-center my-5 items-center gap-10 ">
        {
           eventsData && eventsData.map((e,index)=><UserEvent key={index} data={{interestedList,setInterestedList,e,addEdit,setAddEdit,deleteEvent}}></UserEvent>)
        }
        </div>

        <div 
        onClick={()=>{setAddEdit(()=>{return {...addEdit,visibility:!addEdit.visibility}})}}
        className=" p-2 fixed bottom-[50px] left-[50px] w-fit flex gap-2 justify-center items-center cursor-pointer duration-300 hover:scale-125">
        <IoAddCircleSharp className="w-[50px] h-[50px] text-purple-200" /> Add Event</div>

        { reloadAPI && interestedList.visibility ?  <div className="fixed top-0 left-0 w-[100%] h-[100vh] flex justify-center items-center bg-[#000000d3] z-20">
            <div className=" w-[300px] h-[500px] p-5 bg-white rounded-2xl flex flex-col gap-3 overflow-auto">
                <FaRegWindowClose 
                onClick={()=>{setInterestedList(()=>{return {...interestedList,visibility:!interestedList.visibility}})}}
                className="w-fit cursor-pointer text-red-500" />
                <div className="w-[100%] cursor-pointer text-2xl text-center text-gray-900">People Interested</div>
                {interestedList.data.map((e,index)=><div key={index} className="text-gray-500">{e}</div>)}
            </div>
        </div> : null}

        { addEdit.visibility ?  <div className="fixed top-0 left-0 w-[100%] h-[100vh] flex justify-center items-center bg-[#000000d3] z-20">
            <div className=" w-[300px] h-[500px] p-5 bg-white rounded-2xl flex flex-col gap-3 overflow-auto">
                <FaRegWindowClose 
                onClick={()=>{setAddEdit(()=>{return {...addEdit,visibility:false,isEditing:false}})}}
                className="w-fit cursor-pointer text-red-500" />
                
                <input type="text" id="title" defaultValue={addEdit.isEditing?addEdit.oldData.title:""} className="outline-0 shadow-black shadow-2xl w-[100%] h-[60px] p-2 rounded-xl" placeholder="Title" />
                <textarea id="description" defaultValue={addEdit.isEditing?addEdit.oldData.description:""} className="outline-0 shadow-black shadow-2xl w-[100%] h-[200px] p-2 rounded-xl" placeholder="Description" name="" ></textarea>
                <div className="flex">
                    <div>Type : </div>
                    <select name="type" id="type" defaultValue={addEdit.isEditing && addEdit.oldData.type ?addEdit.oldData.type:"music"}>
                        <option value="music">music</option>
                        <option value="dance">dance</option>
                        <option value="classical">classical</option>
                        <option value="meet">meet</option>
                        <option value="standup">standup</option>
                     </select>
                    </div>
                <input type="date" id="date" defaultValue={addEdit.isEditing?addEdit.oldData.date:""} className="outline-0 border border-black shadow-black shadow-2xl w-[100%] h-[30px] p-2 rounded-xl"/>
                <input type="text" id="location" defaultValue={addEdit.isEditing?addEdit.oldData.location:""} className="outline-0 shadow-black shadow-2xl w-[100%] h-[30px] p-2 rounded-xl" placeholder="Location" />
                <input type="file" onChange={(e)=>{setFile(e.target.files[0]);}}  id="photo" className="outline-0 shadow-black shadow-2xl w-[100%] h-[30px] p-2 rounded-xl" placeholder="Location" accept="image/png, image/gif, image/jpeg" />
                

                <div className="w-[100%] flex justify-center items-center"> 
                    <button
                    onClick={handleSaveEdit}
                    disabled={isCallingApi}
                    className="px-2 bg-red-600 text-white rounded-2xl shadow-black shadow-2xl cursor-pointer text-2xl">Save</button>
                </div>
            </div>
        </div> : null}
    </>)
}

export default UserPage;