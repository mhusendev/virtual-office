const { midleware } = require('../../controllers/controller_auth')

module.exports = function () {
    let operations = {
      GET,

    };
  
    async function GET(req, res, next) {
         let getAuth = await midleware(req)
         console.log(getAuth)
       
         let session = getAuth.session
         
        //  console.log(getAuth)
         if(getAuth.status == false) { res.sendStatus(401)}
         else {
          let flag = await req.headers['btob'] ? true:false
          if(flag) {
            res.status(200).send({message: 'Authorized', status: true,session:session})
          }
          else {
            res.status(200).send({message: 'Authorized', status: true})
          }
        } 
       
       
    
        }
 


    GET.apiDoc = {
      tags: ['Auth'],
      description:'Middleware for Authorization',
      summary: "Authorized your apps.",
      operationId: "getAuth",
      responses: {
        200: {
          description: "Authorized",
    
        },
        401: {
            description: "Unauthorized"
        }
      },
    };
  
 
    return operations;
  };
