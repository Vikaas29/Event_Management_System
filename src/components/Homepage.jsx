import { useEffect, useState } from "react";
import { Searchbar } from "./SearchBar";
import { User } from "./User";
import { HomeEvent } from "./HomeEvent";

export function Homepage(){
    const [filter,setFilter]=useState({});
    const [eventsData,setEventsData]=useState(null);
//    " https://event-management-system-backend-phi.vercel.app/"


    useEffect(()=>{

       async function apiCall() {
        
        const response=await fetch("https://event-management-system-backend-phi.vercel.app/getevents/all");
        const result= await response.json();

        console.log(result);

        setEventsData(result);
       }
       apiCall();
    },[])

    return (<>

        <Searchbar filter={{filter,setFilter}}></Searchbar>
        <User></User>

        <div className="w-[100%] m-10 flex flex-wrap ">
            <HomeEvent></HomeEvent>
        </div>

    </>)
}

export default Homepage;