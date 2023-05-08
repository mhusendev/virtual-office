const helper = require('../../../keycloak/helper')
const { midleware } = require('../../../controllers/controller_auth')
const { register } = require('../../../controllers/user_controllers')

module.exports = function () {
    let operations = {
      POST,
    };
  
 
  
    async function POST(req, res, next) {
        // console.log(req.body)
        const query = await register(req)
         console.log(query.status)
        if(query.status == 201) return res.sendStatus(201)
         res.status(query.status).send(query);
      
           
    }


  
 
    POST.apiDoc = {
      tags: ['users'],
      summary: "Register User.",
      operationId: "registerUser",
      consumes: ["application/json"],
      parameters: [
        {
          in: "body",
          name: "User",
          schema: {
            $ref: "#/definitions/user_post",
          },
        },
      ],
      responses: {
        201: {
          description: "Created",
        },
      },
    };
  
   

  
    return operations;
  };
