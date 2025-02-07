
import { useEffect, useState } from 'react';
import './App.css'
import { Outlet } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import io from "socket.io-client"

function App() {
  const notify = (message) => toast(message);
  const email=localStorage.getItem("email");
  const [socket,setSocket]=useState(null);

  useEffect(() => {
      const newSocket= io("https://event-management-system-backend-phi.vercel.app");
        // newSocket.on("connect",()=>{notify("socketConnected")});

        // newSocket.on("disconnect",()=>{notify("socketDisconnected")});

        // newSocket.emit("join_room",email);

      //  newSocket.on("receive_message",(data)=>{notify(data)});

       return () => {
        if (socket) {
          socket.disconnect();
        }
      }
  }, [])
  
  return (
    
    <>
      <ToastContainer />
      <Outlet></Outlet>
    </>
  )
}

export default App
