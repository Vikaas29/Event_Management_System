import { useState } from "react";

export function Filter(){

    let eventTime=["All","Upcoming","Past"];
    const [x,setX]=useState(0);

    let eventType=["All","Music","Dance","Classical","Meet","Standup"];
    const [y,setY]=useState(0);

    return (<>
        <div className=" w-[300px] h-[700px] mt-20 rounded-4xl flex flex-col justify-center items-start p-5 bg-white shadow-2xl shadow-black">
            <div className="text-center flex text-2xl">
                <div className="">Events : </div>
                <div className="cursor-pointer"
                onClick={()=>{setX( ()=>{if(x==2)return 0 ; return x+1})}}>{ eventTime[x]}</div>
            </div>
            <div className="text-center flex text-2xl">
                <div className=""> Type :</div>
                <div className="cursor-pointer"
                onClick={()=>{setY( ()=>{if(y==5)return 0 ; return y+1})}}>{ eventType[y]}</div>
            </div>
            <div>Search by Date : <input type="date" /></div>
        </div>
    </>)
}



{/* <div className="border border-black w-[100px] h-[100px] rounded-2xl flex flex-col justify-center items-center bg-white  shadow-black shadow-2xl">
                    <div>All</div>
                    <div>Upcoming</div>
                    <div>Past</div>
                </div> */}