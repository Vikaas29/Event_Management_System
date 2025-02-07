
import { useEffect, useState,createContext} from 'react';
import './App.css'
import { Outlet } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import io from "socket.io-client"
export const MyContext = createContext();

function App() {
  
  const notify = (message) => toast(message);
  const email=localStorage.getItem("email");
  const [reloadAPI,setReload]=useState(1);
  useEffect(() => {
    connectToSocket();
  }, [])
  function setter(){
    setReload(count=>{return count+1;});
    
  }
  function connectToSocket(){
    if(email){
      const newSocket= io("https://event-management-system-9aat.onrender.com");
      
      newSocket.on("connect",()=>{notify("socketConnected")});

      newSocket.on("disconnect",()=>{notify("socketDisconnected")});

      newSocket.emit("join_room",email);

     newSocket.on("receive_message",(data)=>{notify(data);setter();});
    }
  }
  
  return (
    
    <>
      <ToastContainer />
      <MyContext.Provider value={{reloadAPI,connectToSocket,notify}}>
        <Outlet></Outlet>
      </MyContext.Provider>
    </>
  )
}

export default App
