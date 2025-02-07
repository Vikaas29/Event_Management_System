import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

export function UserEvent(props){
    const {interestedList,setInterestedList,e,addEdit,setAddEdit,deleteEvent}=props.data;

    const data=e.data;

    
    return (<>

        <div className="w-[300px] h-[400px] shadow-black shadow-2xl rounded-2xl individualEventAnimation cursor-pointer relative overflow-hidden ">
    
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
                
                <div className="flex gap-2 justify-center items-center">
                    <div
                    onClick={
                        ()=>{setInterestedList(()=>{return {visibility:!interestedList.visibility,data:data.people}})
                        
                    }}
                    className=" bg-green-200 w-fit px-2 rounded-2xl shadow-black shadow-2xl">People Interested</div>
                
                    <FaRegEdit onClick={
                        ()=>{
                            setAddEdit({visibility:true,id:e._id,oldData:data,isEditing:true})
                        }
                    } className="text-green-600 " title="EDIT" />
                    <MdDeleteForever onClick={()=>{deleteEvent(e._id)}} className="text-red-500" title="DELETE" />
                
                </div>
            </div>
        </div>
        </>)
}