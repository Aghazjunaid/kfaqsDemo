var mongoose=require("mongoose");

var Schema=mongoose.Schema;

var CategorySchema= new Schema({
    categoryName:{type:String, required:true},
    createdAt:{type:Date, default:Date},
    updatedAt:{type:Date,default:Date.now},
},{ timestamps:true });

var ProductSchema= new Schema({
    name:{type:String,required:true,unique:true},
    price:{type:Number,required:true},
    currency:{type:String,required:true},
    description:{type:String},
    category: {type: Schema.Types.ObjectId, ref: 'category'},
    createdAt:{type:Date, default:Date},
    updatedAt:{type:Date,default:Date.now},
},{ timestamps:true });

Category = mongoose.model("category", CategorySchema);
Product = mongoose.model("product", ProductSchema);

module.exports={ Category, Product}