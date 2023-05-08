
import Link from "next/link";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { socket } from "@/connect/connection";

 


 function Chat() {
  var socket = io.connect(process.env.SOCKET_HOST)
  let listuser = []
  const [userlist,setUserlist] = useState([Object])
  const [loading, setLoading] = useState(true)
  const [writing, setWriting] = useState('')
  const [userData,setUserData] = useState({})
    const getUser = async()=> {
       try{
        let data = await fetch(process.env.NEXT_PUBLIC_API_URL + process.env.userinfo, {
          method: 'GET',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
           
          },
          credentials: 'include',
        })
        return data.json()
       } catch(error) {
        console.log(error)
       }

    }
    const writingText = async(e) => {
      e.preventDefault()
      
    }
   const router = useRouter()
   const { room } = router.query
  

 
setTimeout(()=>{
  setLoading(false)
},1000)
const initializeSocket = async() => {
  
  let userdata = await getUser()
  setUserData(userdata)
  const datajoin = {
    room:room,
    data:userdata.preferred_username
}



socket.emit('join_room', datajoin )
socket.on('user_join', (data)=>{
4
   listuser = data
  
     setUserlist(data)
    //  console.log(data)
})
socket.on('user_write',(data)=> {
  console.log(data)
  setWriting(`${data.preferred_username} sedang menulis pesan...`)
})
socket.on('user_left',(data)=> {
  setUserlist(data)
  // console.log(data)
})
socket.on('user_offline',(data)=> {
  // console.log(data)
  setUserlist(data)
})

}
  useEffect(()=> {
    
   initializeSocket()
   return () => {
    socket.disconnect
   }
   

  },[loading])
  
 
  if(loading) {return (
   <div className="w-full flex justify-center">
      <h1>Loading...</h1>
  </div>) }
  return (
    <div
      className="w-full h-screen
   bg-slate-800 overflow-hidden"
    >
      <nav className="bg-white shadow-lg  border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center mx-auto p-4">
          <Link href="/" className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </Link>
          <h1 className="text-white ml-5 font-extrabold">Room {room}</h1>
          <p className="ml-5 text-white">{writing}</p>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </nav>

      <div className="w-full  h-[100%] bg-slate-700">
        <div className="w-[100%] h-[85%]  flex">
          {/* chat space */}
          <div className="w-[80%] h-[100%]">
            <div className="w-full h-[93%]"></div>
            <div className="w-full h-[7%] flex">
              <input
                type="text"
                onChange={(e)=> {
                  
                     writingText(e)
                }}
                className="w-[90%] pl-3 h-full outline-none border-transparent focus:outline-none
            focus:border-transparent"
              />
              <button className="w-[10%] bg-green-800 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-full h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* online people space */}

          <div className="w-[20%] h-[100%] bg-white flex flex-col">
            <div className="bg-blue-950 w-full h-16 flex justify-center pt-3 shadow-inner shadow-slate-950">
                <h1 className="text-white font-extrabold">Online People</h1>
            </div>
            {/* list online */}
            <div className="w-full h-full  overflow-y-scroll">
           { userlist.map((user,index)=> {
            return <div key={index}  className=" bg-white  shadow-lg p-3 my-2 flex flex-row font-medium text-green-900">
                <div className={user.online?" bg-green-600 h-2 w-2 mt-3 rounded-full":'bg-red-600 h-2 w-2 mt-3 rounded-full'}></div>
                  <p className="ml-2"> {user.username}</p>
               </div>
           })}
            </div>
            {/* end list online */}
            <div className="bg-blue-950 w-full h-16 flex justify-center pt-3 shadow-inner shadow-slate-950">
            
            </div>

          </div>
        </div>
        {/* footer */}
        <div className="w-full h-[15%] flex pt-3 text-white justify-center bg-slate-900 shadow-lg">
          &copy; Muhammad Husen
        </div>
      </div>
    </div>
  );
}

export default Chat