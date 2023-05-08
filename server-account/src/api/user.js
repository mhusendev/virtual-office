const helper = require('../../keycloak/helper')
const { midleware } = require('../../controllers/controller_auth')
const { register,getDataCustomer,updateDataCustomer } = require('../../controllers/user_controllers')

module.exports = function () {
    let operations = {
 
 
      PUT

    };
  
    


  async function PUT(req, res, next) {
    let getAuth = await midleware(req)
    console.log(getAuth)
   //  console.log(getAuth)
    if(getAuth.status == false) {
       res.sendStatus(401)
      }
    else {

      let query = await updateDataCustomer(req)
      if(query.status == 204 || query.status === 200) return res.status(200).send({status:200, message: 'success update data'})
      res.sendStatus(query.status)

    }


  }

  // function DELETE(req, res, next) {
  //   console.log(`About to delete Customer id: ${req.query.id}`);
  //   res.status(200).send();
  // }



  PUT.apiDoc = {
    tags: ['users'],
    summary: "Update User.",
    description:'no need id , the id included in token session',
    operationId: "updateUser",
    parameters: [
      {
        in: "body",
        name: "Customer",
        schema: {
          $ref: "#/definitions/user_put",
        },
      },
    ],
    responses: {
      200: {
          description: "success update.",
          schema: {
              type:"object",
              properties: {
                  status: {
                      type: "number",
                  },
                  message: {
                      type: "string",
                  }
              },
          },
        },
    },
  };

  
    return operations;
  };
