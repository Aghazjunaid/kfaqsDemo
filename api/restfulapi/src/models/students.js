const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        reuired:true,
    },
        email:{
        type:String,
        reuired:true,
        unique:true,
        },
        phone:{
            type:Number,
            required:true,
            unique:true
        }
    
})

const Student = new mongoose.model('Student', studentSchema);

module.exports = Student;