import { useState } from "react"


export function HomeEvent(props){

    const {notify}=props.data;
    
    const email=localStorage.getItem("email");
    const isGuest=localStorage.getItem("guest");
    const JWT=localStorage.getItem("jwt");

    const data=props.data.e.data;

    const [isInterested,setIsInterested]=useState(true);

    async function handleInterest(){

        try {
            // id,isInterested,newEmail

            console.log("hello world")
            const response= await fetch(" https://event-management-system-backend-phi.vercel.app/editpeople",{
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
          setIsInterested(()=>!isInterested);
        } catch (error) {
            console.log(error)
            notify(error);
        }
    }

    return (<>

    <div className="w-[300px] h-[400px] shadow-black shadow-2xl rounded-2xl individualEventAnimation cursor-pointer relative overflow-hidden  duration-300 hover:scale-105">

        <div className="m-1 text-gray-400 flex">
            <div className="w-[40%]">{data.date}</div>
            <div className="w-[60%] text-end">{data.location}</div>
        </div>
        <div className="flex flex-col justify-center items-center w-[100%] p-3 text-center gap-2 overflow-hidden">
            <img 
            className="w-[250px] h-[200px] rounded-2xl shadow-black shadow-2xl"
            src={data.image.url} alt="" />

            <div className="text-2xl w-[250px] ">{data.title}</div>
            <div className=" text-xs w-[250px] h-[60px] text-wrap truncate hover:overflow-auto rounded-2xl duration-200 hover:shadow-black hover:shadow-2xl">{data.description}</div>
            {isGuest=="true"? <div className=" bg-green-200 w-fit px-2 rounded-2xl shadow-black shadow-2xl">Login to Book</div> :
            email==props.data.e.email ? 
            <div  className=" bg-green-200 w-fit px-2 rounded-2xl shadow-black shadow-2xl">This is your event</div>
            :
            
                isInterested ? 
                <div onClick={()=>{ handleInterest() }} className=" bg-green-200 w-fit px-2 rounded-2xl shadow-black shadow-2xl duration-200 hover:scale-125">Interested ?</div>
                :
                <div onClick={()=>{ handleInterest()}} className=" bg-gray-200 w-fit px-2 rounded-2xl shadow-black shadow-2xl duration-200 hover:scale-125">Not Interested !</div>
            
            }
        </div>
        {/* <div className=" bg-purple-400 text-center w-[100%] h-[110px] flex flex-col justify-center items-center p-5 gap-5 ">
        <div className="w-[100%]" >Location : this this delhi India</div>
            
            
        </div> */}
    </div>
    </>)
}