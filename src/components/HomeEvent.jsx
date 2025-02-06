import { useState } from "react"

export function HomeEvent(){

    const [isInterested,setIsInterested]=useState(true);


    return (<>

    <div className="w-[300px] h-[400px] shadow-black shadow-2xl rounded-2xl individualEventAnimation cursor-pointer relative overflow-hidden ">

        <div className="m-1 text-gray-400 flex">
            <div className="w-[40%]">2025/12/01</div>
            <div className="w-[60%] text-end">Delhi,india</div>
        </div>
        <div className="flex flex-col justify-center items-center w-[100%] p-3 text-center gap-2 overflow-hidden">
            <img 
            className="w-[250px] h-[200px] rounded-2xl shadow-black shadow-2xl"
            src="https://i.pinimg.com/1200x/8b/8d/68/8b8d68a2fbfd23930de9dbc9da6fb0c2.jpg" alt="" />

            <div className="text-2xl w-[250px] ">Title</div>
            <div className=" text-xs w-[250px] h-[60px] text-wrap truncate hover:overflow-auto rounded-2xl duration-200 hover:shadow-black hover:shadow-2xl">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam odio veritatis vel? Nulla ipsa excepturi dolore dolorum expedita ipsam modi consequuntur voluptates, alias sapiente rem asperiores iste non eum at.</div>
            {
                isInterested ? 
                <div onClick={()=>{setIsInterested(()=>!isInterested)}} className=" bg-gray-200 w-fit px-2 rounded-2xl shadow-black shadow-2xl">Not Interested</div>
                :
                <div onClick={()=>{setIsInterested(()=>!isInterested)}} className=" bg-green-200 w-fit px-2 rounded-2xl shadow-black shadow-2xl">Interested</div>
            }
        </div>
        {/* <div className=" bg-purple-400 text-center w-[100%] h-[110px] flex flex-col justify-center items-center p-5 gap-5 ">
        <div className="w-[100%]" >Location : this this delhi India</div>
            
            
        </div> */}
    </div>
    </>)
}