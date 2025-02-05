import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosFunnel } from "react-icons/io";
import { RiResetLeftLine } from "react-icons/ri";

export function Searchbar(){
    let eventTime=["All","Upcoming","Past"];
    const [x,setX]=useState(0);

    let eventType=["All","Music","Dance","Classical","Meet","Standup"];
    const [y,setY]=useState(0);

    const [isFilterActive,setIsFilterActive]=useState(false);

    const handleReset=()=>{
        document.getElementById("calender").value="";
        setX(0);
        setY(0);

    }
    return (<>
    
    <div className="w-[100%] flex justify-center items-center mt-7 text-purple-500">
        {
            !isFilterActive ?
            <div className="w-[60%] h-[60px] rounded-4xl shadow-black shadow-2xl flex place-items-center pl-3">
            <input type="text" placeholder="Search Events" name="" id="" className="w-[95%] h-[55px] outline-0 rounded-4xl p-3 text-3xl" />
            </div> 
            
            : 
            
            <div className="w-[60%] h-[60px] rounded-4xl shadow-black shadow-2xl flex justify-center items-center gap-3 pl-3">
                <div className="text-center flex place-items-center text-xs lg:text-xl w-[25%]">
                    <div className=" ">Events : </div>
                    <div className="cursor-pointer text-gray-500"
                    onClick={()=>{setX( ()=>{if(x==2)return 0 ; return x+1})}}>{ eventTime[x]}</div>
                </div>

                <div className="border border-gray-300 h-[80%]"></div>

                <div className="text-center flex place-items-center  text-xs lg:text-xl w-[25%]">
                    <div className=""> Type :</div>
                    <div className="cursor-pointer text-gray-500"
                    onClick={()=>{setY( ()=>{if(y==5)return 0 ; return y+1})}}>{ eventType[y]}</div>
                </div>

                <div className="border border-gray-300 h-[80%]"></div>

                <div className="text-xs lg:text-xl w-[50%] ">Search by Date : <input type="date" id="calender" className="text-gray-500 cursor-pointer" /></div>
            </div>
        }
        {
            !isFilterActive ?
             <IoIosFunnel onClick={()=>{setIsFilterActive(()=>!isFilterActive)}} className=" h-[50px] w-[50px] bg-gray-200 rounded-[100%] p-1 ml-2 cursor-pointer shadow-black shadow-2xl "></IoIosFunnel>
             : 
             <>
             <FaSearch onClick={()=>{setIsFilterActive(()=>!isFilterActive)}} className=" h-[50px] w-[50px] bg-gray-200 rounded-[100%] p-1 ml-2 cursor-pointer shadow-black shadow-2xl " />
             <RiResetLeftLine onClick={handleReset} className=" h-[50px] w-[50px] bg-gray-200 rounded-[100%] p-1 ml-2 cursor-pointer shadow-black shadow-2xl " />
             </>
        }
    </div>
    </>)
}