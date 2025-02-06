import { useState } from "react";
import { FaRegUser } from "react-icons/fa";

export function User(){

    const [isUserActive,setIsUserActive]=useState(false);

    return(<>
    {
        isUserActive ? 
        <>
        <div className=" fixed right-[30px] bottom-[120px] z-10 ">
            <div className="bg-gray-500 rounded-2xl shadow-black shadow-2xl text-center m-2 p-2 font-mono duration-300 cursor-pointer hover:scale-125">
                My Events
            </div>
            <div className="bg-gray-500 rounded-2xl shadow-black shadow-2xl text-center m-2 p-2 font-mono duration-300 cursor-pointer hover:scale-125">
                My Interests
            </div>
            <div className="bg-gray-500 rounded-2xl shadow-black shadow-2xl text-center m-2 p-2 font-mono duration-300 cursor-pointer hover:scale-125">
                HomePage
            </div>
            <div className="bg-gray-500 rounded-2xl shadow-black shadow-2xl text-center m-2 p-2 font-mono duration-300 cursor-pointer hover:scale-125">
                Logout
            </div>
        </div>
        <FaRegUser
        onClick={()=>{setIsUserActive(()=>!isUserActive)}}
        className="z-10 w-[60px] h-[60px] fixed right-[50px] bottom-[50px] cursor-pointer bg-gray-300 text-purple-800 p-2 rounded-[100%] shadow-black shadow-2xl duration-300 hover:scale-125 hover:border-2 hover:border-purple-500" />
        </>
        :
        <FaRegUser
        onClick={()=>{setIsUserActive(()=>!isUserActive)}} 
        className="z-10 w-[60px] h-[60px] fixed right-[50px] bottom-[50px] cursor-pointer bg-gray-300 text-purple-800 p-2 rounded-[100%] shadow-black shadow-2xl duration-300 hover:scale-125 hover:border-2 hover:border-purple-500" />
    }
    </>)
}