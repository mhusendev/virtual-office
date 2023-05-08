
const {joinRoom, sendMessage, Disconnect} = require('../controllers/socket-controller')
const routeSocket = async (socket) => {
 try{
      console.log(`client ${socket.id} connected`)
      joinRoom(socket)
      sendMessage(socket)
      Disconnect(socket)


  }catch(err) {
    console.log(err)
    return false
  }


}


module.exports = routeSocket