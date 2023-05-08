import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Router from "next/router";
import Room from '../../components/room'

export default function Map() {
     // console.log(props.data)
     const [data,setData]= useState('')
     const [loading, setLoading] = useState(false)
   

     useEffect(()=>{
          
          fetch(process.env.NEXT_PUBLIC_API_URL + process.env.userinfo, {
               method: 'GET',
               headers: {
                 'Accept': 'application/json, text/plain, */*',
                 'Content-Type': 'application/json',
                
               },
               credentials: 'include',
             })
             .then(res => res.json())
             
             .then((data)=> {
   
               setData(data)
               // console.log(data)
               setLoading(false)
          
             }).catch((err)=> {
               console.log('ada eror :'+err)
             })
     }, [])
   if(loading) {return <><p>sedang memuat halaman....</p></>}
   else {
     return (

          <div className='bg-slate-900 w-full h-screen p-3 overflow-hidden'>
           <div className='w-full flex justify-between'>
           <h1 className='text-white text-4xl font-extrabold border-b w-fit pb-5'>Map Office</h1>
           <div className='flex justify-between'>
               <div className='mr-5'>
               <h1 className='text-white'>{data.name ? data.name :'...'}</h1>
               <h2 className='text-white text-xs'>{data.job_title ? data.job_title :'...'}</h2>
               </div>
        <div className="flex space-x-2">
         <div className="relative w-12 h-12">
           <img className="rounded-full border border-gray-100 shadow-sm" src="/img/ava.png" alt="user image" />
           <div className="absolute top-0 right-0 h-3 w-3 my-1 border-2 border-white rounded-full bg-green-400 z-2"></div>
         </div>
         </div>
            
              
           </div>
           
           </div>
           <Room />
           
          </div>
         )
   }
   
}
