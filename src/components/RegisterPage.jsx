import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { MyContext } from "../App";
export function RegisterPage(){
    const {notify}=useContext(MyContext);
    const navigate=useNavigate();

    const [email,setEmail]=useState();
    const [username,setUsername]=useState();
    const [password,setPassword]=useState();
    const[isCallingApi,setIsCallingApi]=useState(false);

    async function submit(e){
        
        e.preventDefault();

        if(!email.includes("@") || !email.includes(".com")){
            alert("enter email correctly");
            return;
        }

        if(!email || !username || !password){
            notify("all fields are necessary")
            return;
        }

        try {
            setIsCallingApi(true);
            const saveUser=await fetch("https://event-management-system-9aat.onrender.com/register",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    userName:username,
                    email:email,
                    password:password
                })
            });
    
            const message=await saveUser.json();
            notify(message.message);
    
            if(message.message=="Registeration Successfull")
            {
                setTimeout(()=>{
                navigate("/login");
            },1000);
        }
    
        } catch (error) {
            console.log(error)
        }
        finally{
            setIsCallingApi(false);
        }
    }

    return (<>
    
    <div className="w-[100%] h-[80vh] flex flex-col justify-center items-center gap-10">
        <div className="text-green-600 text-5xl ">Register New User</div>
        <form action="" className="bg-gray-400 border-[5px] border-white rounded-2xl w-[50%] p-[5%] flex flex-col gap-10 justify-center items-center backdrop-blur-md hover:border-red-600">
            <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" className="bg-white w-[70%] text-xl p-[5px] rounded-lg text-black" />
            <input type="text" onChange={(e)=>{setUsername(e.target.value)}} placeholder="UserName" className="bg-white w-[70%] text-xl p-[5px] rounded-lg text-black" />
            <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" className="bg-white w-[70%] text-xl p-[5px] rounded-lg text-black"/>

            <button type="submit" disabled={isCallingApi} onClick={(e)=>{submit(e)}} className="border border-red-600 bg-red-600 font-bold w-[70%] text-xl p-[5px] rounded-lg duration-300 hover:text-black hover:scale-110">Submit</button>
            <div>
             Have a account? <span className="text-red-600 font-bold cursor-pointer" onClick={()=>{navigate("/login")}}>Login here</span>
            </div>
        </form>

        
    </div>
    </>)
}

export default RegisterPage;