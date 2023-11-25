var express = require('express');
var router = express.Router();
const userModel=require('./users')
const postModel=require('./posts')


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/alluserposts', async function(req, res, next){
  let users=await userModel.findOne({_id:"656250b5a31eb3da37d5cad9"})
  .populate("posts")
  res.send(users)
})

router.get('/createuser', async function(req, res, next) {
  let createdUser=await userModel.create({
    
  username :"harsh" ,
  password: "harsh" ,
  posts: [],
  email: "harsh@male.com",
  fullName: "Harsh Vandana Sharma" ,
  })
  res.send(createdUser)

});
router.get('/createpost', async function(req, res, next) {
  let createdPost=await postModel.create({
    
    postText: "hello world how are you?" ,
    user:"656250b5a31eb3da37d5cad9",
    
  })
  let userone=await userModel.findOne({_id:'656250b5a31eb3da37d5cad9'})
  userone.posts.push(createdPost._id)
  await userone.save()
  res.send("done")

});

module.exports = router;
