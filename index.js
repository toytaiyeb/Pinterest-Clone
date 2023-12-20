var express = require('express');
var router = express.Router();
const userModel=require('./routes/users.js')
const postModel=require('./routes/posts.js')
const passport = require('passport')
const upload = require('./routes/multer.js')


const localStrategy = require('passport-local')
passport.use( new localStrategy(userModel.authenticate()));


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('login', {error:req.flash('error')});
});
router.get('/feed',isLoggedIn, async function(req, res, next) {
  let user=await userModel
  .findOne({username:req.session.passport.user}).populate("posts")
  console.log(user);
  res.render('feed',{user});
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

  let user=await userModel
  .findOne({username:req.session.passport.user}).populate("posts")
  res.render('profile', {user})
});

router.post('/upload',isLoggedIn, upload.single("file"), async function(req, res) {
  if(!req.file){
    return res.status(404).send("no file selected")
  }
  let user=await userModel.findOne({username:req.session.passport.user});
  const postData =await postModel.create({
    image:req.file.filename, 
    imageText:req.body.filecaption,
    user:user._id
  })
  user.posts.push(postData._id)
  await user.save()
  res.redirect("/profile")

})


module.exports = router;









