import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Login() {
  return (
   <div className='w-full flex justify-center h-screen
   bg-slate-900 pt-24'>
     
   <div className='w-80 h-96
    bg-blue-900 rounded-lg'>

      <div className='w-full flex justify-center p-3'>
        <h1 className='text-white text-2xl shadow-sm border-b-2 pb-2'>Login</h1>
      </div>
      
      <form className='w-full flex flex-col'>
      <h2 className='ml-5 mt-5 text-white'>Username</h2>
        <div className='flex justify-center px-5 pt-2'>
        <input type='text' className='input-husen w-full  px-2 bg-transparent
          outline-none
          text-white
          outline-transparent
          ring-0
          focus:ring-0
          active:bg-transparent
          text-sm focus:text-base
          border-b  focus:border-b
          focus:outline-none'/>
        </div>
        <h2 className='ml-5 mt-5 text-white'>Password</h2>
        <div className='flex justify-center px-5 pt-2'>
        <input type='password' className='input-husen w-full  px-2 bg-transparent
          outline-none
          text-white
          outline-transparent
          ring-0
          focus:ring-0
          active:bg-transparent
          text-sm focus:text-base
          border-b  focus:border-b
          focus:outline-none'/>
        </div>
        <div className='flex justify-center px-5 pt-2'>
         <button className='bg-slate-900 text-white px-10 py-2 rounded-lg mt-5 '>Login</button>
        </div>

      </form>
   </div>
       
   </div>
  )
}
