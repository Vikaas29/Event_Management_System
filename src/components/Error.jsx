import { useNavigate } from "react-router-dom"

function Error(){

    const navigate=useNavigate();
    return (<>
    <div className="flex flex-col justify-center items-center text-6xl h-[70vh] ">
        Oops...404...Not Found... <div onClick={()=>{navigate("/")}} className=" text-red-500 cursor-pointer">Home</div>
    </div>
    </>)
}

export default Error;