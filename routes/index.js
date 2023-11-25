var express = require('express');
var router = express.Router();
const userModel=require('./users')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/createuser', async function(req, res, next) {
  await userModel.create({
    
  username :"harsh" ,
  password: "harsh" ,
  posts: [],
  email: "harsh@male.com",
  fullName: "Harsh Vandana Sharma" ,
  })

});

module.exports = router;
