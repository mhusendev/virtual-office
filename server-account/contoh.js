
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session')
var logger = require('morgan');
const cors = require('cors')
const axios = require('axios')


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(cors({ credentials: true, preflightContinue: false, origin: ['http://localhost:8080', 'http://localhost:5500', 'http://localhost:3000', '*'] }))
app.use(cookieSession({
    name: 'secure-molada',
    keys: ['secure', 'mallada'],
    httpOnly: false
  }))


const useAccess = async (req) => {
    let value;
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/auth/v1/auth',
        headers: {
        'Content-Type' : 'application/json', 
        'Authorization':'Bearer '+ req.session.passport.user.access_token,
        'btob':'btob'
    }
    })
    .then((response) => {
        // console.log(response)
        value = response.data
       
    })
    .catch(err => {
        // console.log(JSON.stringify(err))
        value ={
            status:false,
            session:{}
        }
       
       
     
    })
    // console.log(value)
    return value
  
    

}
const useRefresh = async (req)=>{
    let value;
    await axios({
        method: 'get',
        url: 'http://localhost:3000/api/auth/v1/auth',
        headers: {
        'Content-Type' : 'application/json', 
        'Authorization':'Bearer '+ req.session.passport.user.refresh_token,
        'btob':'btob'}
    })
    .then((response) => {
        console.log(response.status)
        value = response.data
        
    })
    .catch(err => {
        
        value = {
            status:false,
            session:{}
        }
       
    })
    return value
}

app.get('/',async (req,res)=>{
    
   let auth = await useAccess(req)
// //    console.log(auth)
//    res.send(auth)  
   if(auth.status) {
    res.send(auth)
   } else {
      let refauth = await useRefresh(req) 

    //   req.session = refauth.data
      res.send(refauth)

   }

   

})


app.listen(3600,()=>{
    console.log('app running on port 3600')
})

module.exports = app;
