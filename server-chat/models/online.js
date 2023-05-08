const mongoose = require('mongoose')

const Online = mongoose.Schema({
    socket_id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    room: {
        type: String
    },
    online: {
        type: Boolean
    }
})
module.exports = mongoose.model('Online',Online);