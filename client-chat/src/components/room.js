
import Router from "next/router";

const room = (props) => {
    
    const joinRoom = (room) => {
    
     //    console.log(datauser)
       
        Router.push({
            pathname: '/chat',
            query:{room:room} 
        });
   }

    return (
        <div className='w-full h-screen  pt-10 grid grid-cols-3 '>
                   
        <div className='h-[200px] bg-blue-950 rounded shadow-lg m-3 pt-3 px-2 pb-2'>
               <div className='w-full flex'>
               <h1 className='text-white w-full text-center border-b pb-2 
               font-bold text-lg'>Ruang Direksi</h1>
               <button className='w-full bg-slate-900 ml-1 rounded text-white shadow-md'
               onClick={()=> {joinRoom('A001')}}
               >Enter Room</button>
               </div>
               <div className='w-full h-[84%] flex px-1 py-1'>
                   <div className='w-full h-full border-white border'>
                        <h1 className='w-full text-white border-b text-center'>Author</h1>
                   </div>
                   <div className='w-full h-full border-white border'>
                        <h1 className='w-full text-white border-b text-center'>guest</h1>
                   </div>
               </div>
              </div>
           
              <div className='h-[200px] bg-blue-950 rounded shadow-lg m-3 pt-3 px-2 pb-2'>
               <div className='w-full flex'>
               <h1 className='text-white w-full text-center border-b pb-2 
               font-bold text-lg'>Ruang HRD</h1>
               <button className='w-full bg-slate-900 ml-1 rounded text-white shadow-md'
                onClick={()=> {joinRoom('A002')}}>Enter Room</button>
               </div>
               <div className='w-full h-[84%] flex px-1 py-1'>
                   <div className='w-full h-full border-white border'>
                        <h1 className='w-full text-white border-b text-center'>Author</h1>
                   </div>
                   <div className='w-full h-full border-white border'>
                        <h1 className='w-full text-white border-b text-center'>guest</h1>
                   </div>
               </div>
              </div>
              <div className='h-[200px] bg-blue-950 rounded shadow-lg m-3 pt-3 px-2 pb-2'>
               <div className='w-full flex'>
               <h1 className='text-white w-full text-center border-b pb-2 
               font-bold text-lg'>Ruang Keuangan</h1>
               <button className='w-full bg-slate-900 ml-1 rounded text-white shadow-md'>Enter Room</button>
               </div>
               <div className='w-full h-[84%] flex px-1 py-1'>
                   <div className='w-full h-full border-white border'>
                        <h1 className='w-full text-white border-b text-center'>Author</h1>
                   </div>
                   <div className='w-full h-full border-white border'>
                        <h1 className='w-full text-white border-b text-center'>guest</h1>
                   </div>
               </div>
              </div>
  
              <div className='h-[200px] bg-blue-950 rounded shadow-lg m-3 pt-3 px-2 pb-2'>
               <div className='w-full flex'>
               <h1 className='text-white w-full text-center border-b pb-2 
               font-bold text-lg'>Ruang Meeting</h1>
               <button className='w-full bg-slate-900 ml-1 rounded text-white shadow-md'>Enter Room</button>
               </div>
               <div className='w-full h-[84%] flex px-1 py-1'>
                   <div className='w-full h-full border-white border'>
                        <h1 className='w-full text-white border-b text-center'>Author</h1>
                   </div>
                   <div className='w-full h-full border-white border'>
                        <h1 className='w-full text-white border-b text-center'>guest</h1>
                   </div>
               </div>
              </div>
              <div className='h-[200px] bg-blue-950 rounded shadow-lg m-3 pt-3 px-2 pb-2'>
               <div className='w-full flex'>
               <h1 className='text-white w-full text-center border-b pb-2 
               font-bold text-lg'>Ruang Pegawai</h1>
               <button className='w-full bg-slate-900 ml-1 rounded text-white shadow-md'>Enter Room</button>
               </div>
               <div className='w-full h-[84%] flex px-1 py-1'>
                   {/* <div className='w-full h-full border-white border'>
                        <h1 className='w-full text-white border-b text-center'>Author</h1>
                   </div> */}
                   <div className='w-full h-full border-white border'>
                        <h1 className='w-full text-white border-b text-center'>Pegawai</h1>
                   </div>
               </div>
              </div>
              <div className='h-[200px] bg-blue-950 rounded shadow-lg m-3 pt-3 px-2 pb-2'>
               <div className='w-full flex'>
               <h1 className='text-white w-full text-center border-b pb-2 
               font-bold text-lg'>Ruang Absensi </h1>
               <button className='w-full bg-slate-900 ml-1 rounded text-white shadow-md'>Enter Room</button>
               </div>
               <div className='w-full h-[84%] flex px-1 py-1'>
                   <div className='w-full h-full border-white border'>
                        <h1 className='w-full text-white border-b text-center'>Author</h1>
                   </div>
                   <div className='w-full h-full border-white border'>
                        <h1 className='w-full text-white border-b text-center'>guest</h1>
                   </div>
               </div>
              </div>
           
              
              
              
        </div>
    )
}

export default room