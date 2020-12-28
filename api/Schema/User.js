//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {type:String, unique:true, required:true},
  email: {type:String, unique:true, require:true},
  fullName: {type:String, require:true},
  dob: {type:Date},
  mobile: {type:Number, unique:true},
  password: {type:String, require:true} ,
  createdAt: {type: Date, default:Date},
  updatedAt:{type:Date, default:Date.now}
},{ timestamps: true });

module.exports =  mongoose.model("user", UserSchema)