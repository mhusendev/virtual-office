const {getPeople, savePeople} = require('../../../controllers/people')
module.exports = function () {
    let operations = {
      GET,

    };
  
    async function GET(req, res, next) {
         let getdata = await getPeople(req)
         console.log(req.params.id)
         if(!getdata.message) return  res.status(200).send({ schema_frontend:[],data:getdata})
         res.send(JSON.stringify(getdata.message))
    }
   
  

    GET.apiDoc = {
      tags: ['people'],
      description:'test',
      summary: "Fetch People.",
      parameters: [
        {
          in: 'path', // query, body
          name: 'id',
          required: true,
          type: 'string'
        }
      ],
      security: [
        {
          Bearer: [],
          
        },
      ],
      responses: {
        200: {
          description: "menggunakan select option",
          schema: {
            type: "object",
            properties: {
              schema_frontend: {
                type: 'array',
                items: {
                 type:'string'
                }
              },
              data:{
                type: 'array',
                items: {
                  $ref: "#/definitions/People",
                }

              }
            }
            ,
          },
        },
        401: {
            description: "Unauthorized"
        }
      },
    };
  
    
 
    return operations;
  };
