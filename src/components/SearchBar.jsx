import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosFunnel } from "react-icons/io";
import { RiResetLeftLine } from "react-icons/ri";

export function Searchbar(props){

    const {filter,setFilter}=props.filter;

    let eventTime=["Upcoming","Past"];
    const [x,setX]=useState(0);

    let eventType=["all","music","dance","classical","meet","standup"];
    const [y,setY]=useState(0);

    const [isFilterActive,setIsFilterActive]=useState(false);

    function handleReset(){
       if(document.getElementById("calender")){document.getElementById("calender").value="";}
       if(document.getElementById("filterInput")){document.getElementById("filterInput").value="";}
        setX(0);
        setY(0);
        setFilter({events:true,type:"all"});
    }
    return (<>
    
    <div className="w-[100%] flex justify-center items-center mt-7 text-purple-500">
        {
            !isFilterActive ?
            <div className="w-[60%] h-[60px] rounded-4xl shadow-black shadow-2xl flex place-items-center pl-3">
            <input 
            onChange={(e)=>{setFilter(()=>{return {...filter,text:e.target.value}})}}
            
            type="text" placeholder="Search Events" name="" id="filterInput" className="w-[95%] h-[55px] outline-0 rounded-4xl p-3 text-3xl" />
            </div> 
            
            : 
            
            <div className="w-[60%] h-[60px] rounded-4xl shadow-black shadow-2xl flex justify-center items-center gap-3 pl-3">
                <div className="text-center flex place-items-center text-xs lg:text-xl w-[25%]">
                    <div className=" ">Events : </div>
                    <div className="cursor-pointer text-gray-500"
                    onClick={()=>{setX( ()=>{if(x==1)return 0 ; return x+1}); setFilter(()=>{return {...filter,events:!filter.events}})}}>{ eventTime[x]}</div>
                </div>

                <div className="border border-gray-300 h-[80%]"></div>

                <div className="text-center flex place-items-center  text-xs lg:text-xl w-[25%]">
                    <div className=""> Type :</div>
                    <div className="cursor-pointer text-gray-500"
                    onClick={()=>{let z=1;setY( ()=>{if(y==5){z=0 ;return 0} ; z=y+1; return y+1}); setFilter(()=>{return {...filter,type:eventType[z]}})}}>{ eventType[y]}</div>
                </div>

                <div className="border border-gray-300 h-[80%]"></div>

                <div className="text-xs lg:text-xl w-[50%] ">Search by Date : 
                    <input 
                    onChange={(e)=>{ setFilter(()=>{return {...filter,date:e.target.value}})}}
                    type="date" id="calender" className="text-gray-500 cursor-pointer" /></div>
            </div>
        }
        <div className="flex ">
        {
            !isFilterActive ?
             <>
                <IoIosFunnel onClick={()=>{setIsFilterActive(()=>!isFilterActive)}} className=" h-[50px] w-[50px] bg-gray-200 rounded-[100%] p-1 ml-2 cursor-pointer shadow-black shadow-2xl duration-300 hover:scale-125 text-black"></IoIosFunnel>
                <RiResetLeftLine onClick={handleReset} className=" h-[50px] w-[50px] bg-gray-200 rounded-[100%] p-1 ml-2 cursor-pointer shadow-black shadow-2xl duration-300 hover:-rotate-90 text-black" />
             </>
             : 
             <>
                <FaSearch onClick={()=>{setIsFilterActive(()=>!isFilterActive)}} className=" h-[50px] w-[50px] bg-gray-200 rounded-[100%] p-1 ml-2 cursor-pointer shadow-black shadow-2xl duration-300 hover:scale-125 text-black " />
                <RiResetLeftLine onClick={handleReset} className=" h-[50px] w-[50px] bg-gray-200 rounded-[100%] p-1 ml-2 cursor-pointer shadow-black shadow-2xl duration-300 hover:-rotate-90 text-black " />
             </>
        }
        </div>
    </div>
    </>)
}