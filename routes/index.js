var express = require('express');
var router = express.Router();
const userModel=require('./users')
const postModel=require('./posts')
const passport = require('passport')
const localStrategy = require('passport-local')
passport.use( new localStrategy(userModel.authenticate()));


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {

  res.render('login', {error:req.flash('error')});
});
router.get('/feed', function(req, res, next) {
  res.render('feed', );
});


router.post('/register', function(req, res) { 
  const { username, email, fullname } = req.body;
  const userData = new userModel({ username, email, fullname });

  userModel.register(userData,req.body.password)
  .then(function() {
    passport.authenticate("local")(req,res,function(){
      res.redirect('/profile');
    })
    })

})
router.post('/login',  passport.authenticate('local',{
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true,
}),function(req,res){
});


router.get('/logout', function(req, res, next ) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

function isLoggedIn(req,res,next)
 {
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect('/')

}

router.get('/profile', isLoggedIn, async function(req, res, next) {

  let user=await userModel.findOne({username:req.session.passport.user});
  //let posts=await postModel.find({user:req.session.passport.user})


  res.render('profile', {user})
});


module.exports = router;













// router.get('/alluserposts', async function(req, res, next){
//   let users=await userModel.findOne({_id:"656250b5a31eb3da37d5cad9"})
//   .populate("posts")
//   res.send(users)
// })

// router.get('/createuser', async function(req, res, next) {
//   let createdUser=await userModel.create({
    
//   username :"harsh" ,
//   password: "harsh" ,
//   posts: [],
//   email: "harsh@male.com",
//   fullName: "Harsh Vandana Sharma" ,
//   })
//   res.send(createdUser)

// });
// router.get('/createpost', async function(req, res, next) {
//   let createdPost=await postModel.create({
    
//     postText: "hello world how are you?" ,
//     user:"656250b5a31eb3da37d5cad9",
    
//   })
//   let userone=await userModel.findOne({_id:'656250b5a31eb3da37d5cad9'})
//   userone.posts.push(createdPost._id)
//   await userone.save()
//   res.send("done")

// });

