
const peopleSchema = require('./schemas_openapi/people')

const apiDoc = {
  swagger: "2.0",
  basePath:"/api/",
  info: {
    title: "Keycloak app API.",
    version: "1.0.0",
  },
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "Enter the token"
    }
  },
  definitions: {
  },
  paths: {}

};

apiDoc.definitions['People'] = peopleSchema 


module.exports = apiDoc;
