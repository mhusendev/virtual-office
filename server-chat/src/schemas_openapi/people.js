let data = {
    type: 'object',
    properties: {
        name: {
            type: 'string'
        },
        address:{
            type: 'string'
        },
       
    },
    required:['name','address']
}
module.exports = data