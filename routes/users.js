
const mongoose = require('mongoose');
const plm=require('passport-local-mongoose');


mongoose.connect('mongodb+srv://toy24052003:toy1234@cluster0.riwxmuk.mongodb.net/tvboxed',).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
  dp: {
    type: String,
    
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  fullname: {
    type: String,
    required: true
  }
});


userSchema.plugin(plm);
const User = mongoose.model('User', userSchema);

module.exports = User;





