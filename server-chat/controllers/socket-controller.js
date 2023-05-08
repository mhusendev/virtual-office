const { use } = require("../routes")
const Online = require('../models/online')
let users = []

const getListOnline = async(room)=> {
  try{
    const list = await Online.find({room:room});
    // console.log(list)
    return list
  }catch(err){
    console.log(err)
  }
}
const setOnline = async(data) => {
  console.log(data)
  try{
    const someone = await Online.findOne({username:data.username}) ? await Online.findOne({username:data.username}) : false
      
    if(someone) {
      console.log('refresh online')
   
      await Online.updateOne({username:data.username},{$set: data})
    } else {
      const saveSomeone = new Online(data)
       saveSomeone.save()
       console.log('set online')

    }
 
  } catch (error) {
    console.log(error)
}

}
const setOffline = async(socket) => {

  try{
   

    const someoneoff = await Online.updateOne({socket_id:socket.id},{online: false}) ? await Online.updateOne({socket_id:socket.id},{online: false}) : false
     if(someoneoff){
      const someone = await Online.findOne({socket_id:socket.id}) ? await Online.findOne({socket_id:socket.id}) : false
      const list_offline = await Online.find()
      socket.to(someone.room).emit('user_offline',list_offline)
      console.log(`${someone.username} offline`)
     } 
   
  }catch(error) {
    console.log(error)
  }
}

const getOldRoom = async(username,Newroom) => {
  try{
    const list = await Online.findOne({username:username}) ? await Online.findOne({username:username}) : false
    // console.log(list)

    if(list.room !== Newroom) return list.room
    
    return Newroom


  }catch(err){
    console.log(err)
  }
}
const joinRoom =  (socket) => {
    socket.on('join_room', async(data)=> {
      let oldRoom = await getOldRoom(data.data,data.room)
      


        let datausers = {
          socket_id: socket.id,
          username: data.data ? data.data : false,
          room: data.room,
          online:true
        }
        socket.join(data.room)
      
        if(datausers.username) {
            // check if user in temp exist with same username
            await setOnline(datausers)
       
           
          console.log(`${data.data} joined room: ${data.room}`)
          let listOnline = await getListOnline(data.room)
        // console.log(listOnline)
        socket.to(data.room).emit('user_join',listOnline)
        let listOnlineOldRoom = await getListOnline(oldRoom)
        socket.to(oldRoom).emit('user_left',listOnlineOldRoom)
        }
        
        socket.on('writing_text',(userData)=>{
          console.log('writing text')
          socket.to(data.room).emit('user_write',userData)
        })

       
       
        
    })
}

const sendMessage = (socket) => {
    socket.on('sendMessage',(data)=> {
        console.log(data)
        socket.to(data.room).emit('receive_message',data)
    })
}

const Disconnect = (socket) => {
  socket.on('disconnect',()=> {
    console.log(socket.id)
    setOffline(socket)

   
  })
}

module.exports = { joinRoom , sendMessage, Disconnect}