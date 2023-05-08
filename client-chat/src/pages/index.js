import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Router from "next/router";
import { useRouter } from "next/router";


export default function Home(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword]= useState('');
  const router = useRouter()
  const routerquery = router.query ? router.query : ''
  // console.log(routerquery)
  // console.log(props.router)
  const loginEvent = async() => {
    try {
     const res = await fetch(process.env.NEXT_PUBLIC_API_URL + process.env.login, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
         
        },
        credentials: 'include',
         
        body: JSON.stringify({username: username, password: password})
      })
      const data = await res
      // console.log(res.status)
      if(res.status == 200) {
        Router.push({
          pathname: '/room/map'
      })
      } else {
        Router.push({
          pathname: '/',
          query: { message: 'gagal' }
      });
      }
  } catch (err) {
      console.log(err);
  }
  }

  return (
    <div className="w-full h-screen ">
      <div className="bg-blue-950 w-full h-1/3"></div>
      
      <div className="w-full h-[100%] absolute top-20 px-32">
             <div className="w-full h-[70%] bg-white rounded-lg flex">
                  <div className="w-1/2 h-full flex flex-col">
                     <div className="w-fit text-center mt-[30%] self-center
                     text-3xl text-blue-950 t font-extrabold flex">
                      {/* <img src="/img/logo.png" className="w-10 h-10 mr-2"/> */}
                      Wellcome To Virtual Office</div>
                      <button className="bg-blue-950 w-32 h-fit self-center
                      mt-5 py-3 font-bold rounded-full shadow-lg hover:bg-blue-800 text-white">Sign in</button>
                  </div>
                  {/* login form */}
                  <div className="w-1/2 h-full p-10">
                      <div className="w-full h-full shadow-2xl rounded-2xl p-10">
                
                            <div>
                                <div className="text-sm font-bold text-gray-700 tracking-wide">Username</div>
                                <input className="text-slate-500 w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500" type="" placeholder="username"
                                   onChange={(e)=> {
                                    e.preventDefault()
                                     setUsername(e.target.value)
                                   }}
                                />
                            </div>
                            <div className="mt-8">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                                        Password
                                    </div>
                                    <div>
                                        {/* <a className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                                        cursor-pointer">
                                            Forgot Password?
                                        </a> */}
                                    </div>
                                </div>
                                <input className="text-slate-500 w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500" type="password" placeholder="Enter your password"
                                onChange={(e)=> {
                                  e.preventDefault()
                                  setPassword(e.target.value)
                                }}/>
                            </div>
                            <div className="mt-10">
                                <button className="bg-blue-950 text-gray-100 p-4 w-full rounded-full tracking-wide
                               font-display focus:outline-none focus:shadow-outline hover:bg-blue-800 font-bold
                                shadow-lg" onClick={loginEvent}>
                                    Log In
                                </button>
                            </div>
                       
                      </div>  
                  </div>    
              

             </div>

      </div>
      <div className="bg-gray-950 w-full h-full flex justify-center">
        <h1 className="text-white self-center mt-[5%]">&copy; Cakra Wijaya Solusi</h1>
      </div>
    </div>
  );
}
