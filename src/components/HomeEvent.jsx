import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


export function HomeEvent(props){

    const navigate=useNavigate();

    const {notify}=props.data;
    
    const email=localStorage.getItem("email");
    const isGuest=localStorage.getItem("guest");
    const JWT=localStorage.getItem("jwt");

    const data=props.data.e.data;

    const [isInterested,setIsInterested]=useState(!data.people.includes(email));
    const [isCallingApi,setIsCallingApi]=useState(false);
    const [fullScreen,setFullScreen]=useState(false);

    
    async function handleInterest(){

        try {
            
            setIsCallingApi((isCallingApi)=>!isCallingApi)
            const response= await fetch("https://event-management-system-9aat.onrender.com/editpeople",{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    "authorization": `JWT ${JWT}`
                },
                body: JSON.stringify({
                    id:props.data.e._id,
                    isInterested,
                    newEmail:email
                })
            })

            const result=await response.json();
            notify("Action Completed");
          setIsInterested((isInterested)=>!isInterested);
        } catch (error) {
            console.log(error)
            notify(error);
        }
        finally{
            setIsCallingApi((isCallingApi)=>!isCallingApi)
        }
    }

    function handleFullScreen(){

        const targetDiv=document.getElementById(props.data.e._id);
        if(document.fullscreenElement){
            document.exitFullscreen();
        }
        else{
            targetDiv.requestFullscreen();
        }
        setFullScreen(!fullScreen);
    }

    return (<>

    <div className="w-[300px] h-[400px] shadow-black shadow-2xl rounded-2xl individualEventAnimation cursor-pointer relative overflow-hidden  duration-300 hover:scale-105">

        <div className="m-1 text-gray-400 flex">
            <div className="w-[40%]">{data.date}</div>
            <div className="w-[60%] text-end">{data.location}</div>
        </div>
        <div className="flex flex-col justify-center items-center w-[100%] p-3 text-center gap-2 overflow-hidden">
            <img
            onClick={()=>{
                setFullScreen(!fullScreen);
                handleFullScreen();
            }} 
            className="w-[250px] h-[200px] rounded-2xl shadow-black shadow-2xl" id={props.data.e._id}
            src={data.image.url} alt="" />

            <div className="text-2xl w-[250px] ">{data.title}</div>
            <div className=" text-xs w-[250px] h-[60px] text-wrap truncate hover:overflow-auto rounded-2xl duration-200 hover:shadow-black hover:shadow-2xl">{data.description}</div>
            {isGuest=="true"? <div onClick={()=>{navigate("/login")}} className=" bg-green-200 w-fit px-2 rounded-2xl shadow-black shadow-2xl">Login to Book</div> :
            email==props.data.e.email ? 
            <div  className=" bg-green-200 w-fit px-2 rounded-2xl shadow-black shadow-2xl">This is your event</div>
            :
            
                isInterested ? 
                <button disabled={isCallingApi} onClick={()=>{ handleInterest() }} className=" bg-green-200 w-fit px-2 rounded-2xl shadow-black shadow-2xl duration-200 hover:scale-125 cursor-pointer">Interested ?</button>
                :
                <button disabled={isCallingApi} onClick={()=>{ handleInterest()}} className=" bg-gray-200 w-fit px-2 rounded-2xl shadow-black shadow-2xl duration-200 hover:scale-125 cursor-pointer">Not Interested !</button>
            
            }
        </div>
    </div>
    </>)
}