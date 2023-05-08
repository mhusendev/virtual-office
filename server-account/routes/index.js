var express = require('express');
var router = express.Router();
const passport = require('passport');
require('../keycloak/localLogin')

/* GET home page. */
router.get('/customers/login', function(req, res, next) {
  var refer =  req.headers.referer
  if(req.session.isNew) {
      return res.render('index',{domain:refer,failed:req.query.failed?req.query.failed:false})
  } else {
      return res.redirect(refer)
     
  }
});
router.post('/user/login', passport.authenticate('local'), function (req, res) {
  console.log('berhasil')
  // res.redirect(req.body.domain)
  // res.redirect('/api/auth/v1/api-documentation')
    
    // console.log(req.body)
    // res.send(req.session)
  // res.cookie()
  console.log(req.body)

  res.sendStatus(200)
})

router.get('/user/setcookie',(req,res)=>{

})
router.post('/user2/login', function (req, res) {
  console.log('berhasil')
  // res.redirect(req.body.domain)
  // res.redirect('/api/auth/v1/api-documentation')
    
    console.log(req.body)
    // res.send(req.session)
  // res.cookie()
  res.send('berhasil')
})
module.exports = router;
