const mongoose = require("mongoose");
const Scheme= mongoose.Schema;

const UserSchema = new Scheme({ 
 name:{
     type: String,
     required: true
 },
 email:{
     type:String,
     required:true,
     unique: true
 },
 password:{
     type:String,
     required: true
 },
 data:{
     type:Date,
     default:Date.now
 }
});


const User = mongoose.model('user', UserSchema);
User.createIndexes(); //-----> create unique email in database
module.exports = User;