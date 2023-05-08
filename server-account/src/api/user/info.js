const helper = require('../../../keycloak/helper')
const { midleware } = require('../../../controllers/controller_auth')
const { register,getDataCustomer,updateDataCustomer } = require('../../../controllers/user_controllers')

module.exports = function () {
    let operations = {
 
      GET,

    };
  
    async function GET(req, res, next) {
  
 
        var response = await getDataCustomer(req)
        if(response.status == 401) {
          res.sendStatus(401)
        } else {
          res.status(response.status).send(response.data)
        }
        
    

      // res.send(response)
  }



  // function DELETE(req, res, next) {
  //   console.log(`About to delete Customer id: ${req.query.id}`);
  //   res.status(200).send();
  // }

  GET.apiDoc = {
    tags: ['users'],
    summary: "Get User Info.",
    description:'no need id , the id included in token session',
    operationId: "GetUser",
    security: [
      {
        Bearer: [],
        
      },
    ],
    responses: {
      200: {
        description: "Info of User.",
        schema: {
          type: 'object',
          properties: {
            schema_frontend: {
              type: 'array',
              items: {
               type:'string'
              }
            },
            data:{
              type: 'object',
                $ref: "#/definitions/user_get",
              

            }
          }
        },
      },
      401: {
          description: "Unauthorized"
      }
    },
  };


  
    return operations;
  };
