import { useContext, useEffect, useState } from "react";
import { Searchbar } from "./SearchBar";
import { User } from "./User";
import { HomeEvent } from "./HomeEvent";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../App";

export function Homepage(){
  
   const {notify}=useContext(MyContext);
    const navigate=useNavigate()
    const email=localStorage.getItem("email");
    const isGuest=localStorage.getItem("guest");
    const [filter,setFilter]=useState({events:true,type:"all"});
    const [eventsData,setEventsData]=useState(null);
    const [eventsData2,setEventsData2]=useState(null);

    useEffect(()=>{
      if(!email && isGuest!="true"){navigate("/login"); return}

       async function apiCall() {
        
        const response=await fetch("https://event-management-system-9aat.onrender.com/getevents/all");
        const result= await response.json();

        setEventsData(result.data);
        setFilter({events:true});
        setEventsData2(result.data);
        
       }
       apiCall();
    },[])

    useEffect(() => {
        if(!eventsData)return;
        let filteredArray=[...eventsData2];
      if(filter.text){
        filteredArray=filteredArray.filter(e=>e.data.title.toLowerCase().includes(filter.text.toLowerCase()))
        setEventsData(()=>[...filteredArray])
    };
    
    if(filter.date){
        filteredArray=filteredArray.filter(e=>filter.date==e.data.date);
    }
    else
      {if(filter.events)
      filteredArray= filteredArray.filter((e)=>{return Date.parse(e.data.date)>Date.now()})
        else
      filteredArray= filteredArray.filter((e)=>{ return Date.parse(e.data.date)<Date.now()})
      }

      if(filter.type!="all"){
        console.log("check")
        filteredArray=filteredArray.filter(e=>{if(!e.data.type){return true} return filter.type==e.data.type});
      }
      setEventsData(()=>[...filteredArray]);  
      
      
    }, [filter])
    

    return (<>
        
        <Searchbar filter={{filter,setFilter}}></Searchbar>
        {
          isGuest=="true"? <div onClick={()=>{localStorage.clear();navigate("/login");}} className="fixed bottom-[50px] right-[50px] text-3xl bg-gray-500 rounded-2xl shadow-black shadow-2xl text-center m-2 p-2 font-mono duration-300 cursor-pointer hover:scale-125">Login</div>:<User></User>
        }

        <div className="w-[100%] my-10 flex flex-wrap gap-10 justify-center items-center">
            {eventsData && eventsData.map((e,index)=><HomeEvent key={index} data={{e,notify}}></HomeEvent>)}
        </div>

    </>)
}

export default Homepage;