const userSchema_get = require('./schemas/user/get_user')
const userSchema_post = require('./schemas/user/post_user')
const userSchema_put = require('./schemas/user/put_user')

const apiDoc = {
  swagger: "2.0",
  basePath:"/account-api/",
  info: {
    title: "Account API.",
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
apiDoc.definitions["user_get"] = userSchema_get
apiDoc.definitions['user_post'] = userSchema_post
apiDoc.definitions['user_put'] = userSchema_put


module.exports = apiDoc;
