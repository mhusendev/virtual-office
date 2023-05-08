const keycloack  = require('../keycloak/action')
const validation = require('../keycloak/helper')

const checkToken= async(req,type) => {
    let headers = req.headers['btob'] ? true: false
    if(headers){
       return await validation.useTokensession(req,'token')
    } else{
       return await validation.useTokensession(req,type)
    }

}

const midleware = async(req) => {
  
    let permission = false;
    let token = await checkToken(req,'access_token')

    let userAuth = await keycloack.authKeycloack(token)
    
    // console.log(userAuth)
    let revalidation = await revalidate(req,userAuth)

    //  console.log(JSON.stringify(req.session))
    // console.log(revalidation)
    return revalidation
}

const revalidate = async(req,userAuth) => {

    if(userAuth.status === "true") {
        console.log('mode c')
        console.log(req.headers.btob)
        return {status:true, session:req.session}
       
    
    } else {
        let token = await checkToken(req,'refresh_token')
        let regenerate = await keycloack.getToken(req,token)
        // console.log(regenerate)
        return regenerate
    
    }
}

module.exports = { midleware }