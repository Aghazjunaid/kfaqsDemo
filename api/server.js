const express = require('express');
const bodyParser= require('body-parser');
var mongoose = require('mongoose');
var extend = require('extend');
const bcrypt = require('bcrypt');
const app = express();
const port = 5000;

const User = require("./Schema/User");
const {Category, Product} = require("./Schema/Product");
var mongodbUrl = 'mongodb://127.0.0.1/fame';



var mongoUrl = 'mongodb://127.0.0.1/productdb';
mongoose.connect(mongoUrl, {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex:true,
  useFindAndModify:false
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/user', (req, res) => {
  User.find({}, function(error, doc){
    if(error){
      res.send(String(error))
    }else {
      res.send(doc)
    }
  })
})



app.get('/user/:id', (req, res) => {
  var userId = req.params.id;
  User.find({_id:userId}, function(error, doc){
    if(error){
      res.send(String(error))
    }else {
      res.send(doc)
    }
  })
})



app.put('/user/:id', (req, res) => {
  var opt = extend({}, req.body);
  User.findOneAndUpdate({_id:req.params.id}, opt, {new: true}, function(error, doc){
    if(error){
      res.send(String(error))
    }else {
      res.send(doc)
    }
  })
})

app.delete('/user/:id', (req, res) => {
  var userId = req.params.id;
  User.findByIdAndDelete({_id:userId}, function(error, doc){
    if(error){
      res.send(String(error))
    }else {
      res.send(doc)
    }
  })
})



app.get('/user/:id', (req, res) => {
  var userId = req.params.id;
  User.find({_id:userId}, function(error, doc){
    if(error){
      res.send(String(error))
    }else {
      res.send(doc)
    }
  })
})


app.post('/register', (req, res) => {
  var username = req.body.email.split("@")[0];
  var opt = extend({}, req.body);
  opt.username=username;
  bcrypt.hash(req.body.password, 10, function(err, newPassword) {
    if(err) {
      res.send(String(error))
    }
    opt.password=newPassword;
    var user = new User(opt);
    user.save(function(error, doc){
      if(error) {
        res.send(String(error))
      }
      res.send(doc);
    })
  });

})

// ===================== login function ===========================================================
app.post('/login', async(req , res) => {
  try {
    const user = await User.findOne({email:req.body.email});
    if(user) {
      bcrypt.compare(req.body.password, user.password, function(err, result) {
        if(err){
          res.status(401).send("Invalid credentials!");
        }res.status(200).send("valid login details");
      })
    }
    else {
      res.status(404).send("User not found")
    }
  } catch (error) {
    res.status(400).send("Invalid credentials!")
  }
})

//=========================Category details=========================================================
//=============Adding category details====================================
app.post('/category', (req,res)=>{
  var opt = extend({}, req.body);
  var category = new Category(opt);
  category.save(function(error, doc){
    if(error){
      res.send(String(error))
    }
    res.send(doc)
  })
})

//========================Getting all category details======================
app.get("/category",(req,res)=>{
  Category.find({}, function(err,result){
    if(err){
      res.send(String(err));
    }res.send(result)
  })
})

//=============update category details=======================================
app.put("/category/:id",(req,res)=>{
  var upd = extend({}, req.body);
  Category.findOneAndUpdate({_id:req.params.id}, upd, {new: true}, function(error, result){
    if(error){
      res.send(String(error))
    }else {
      res.send(result)
    }
  })
})

//==============delete category details=======================================
app.delete("/category/:id", (req,res)=>{
  var del=req.params.id;
  Category.findByIdAndDelete({_id:del}, function(error, result){
    if(error){
      res.send(String(error))
    }else {
      res.send(result)
    }
  })
})

//=========================== product details =====================================================
//=============== product post function ========================================
app.post("/product",(req,res)=>{
  var pro=extend({},req.body);
  var prod=new Product(pro);
  prod.save(function(err,result){
  if(err){
    res.send(err);
  }res.send(result);
  })
})

//=================product getAll ===============================================
app.get("/product",(req,res)=>{
  Product.find({},function(err,result){
    if(err){
      res.send(err);
    }res.send(result)
  })
})

//==================== sorting ===================================================
app.get("/sorting",(req,res)=>{
  Product.find({},function(err,result){
    if(err){
      res.send(err);
    }res.send(result)
  }).sort({'price': -1});
})

//===================== searching ================================================
app.get("/search", (req,res)=>{
 var searchField = req.body.name;
 var searchFiel = req.body.description;
  Product.find({$or:[{name:{$regex: searchField, $options: 'i'}},{description:{$regex: searchFiel, $options: 'i'}}]},function(error,doc){
    if(error){
      res.send(error)
    }res.send(doc)
  })
})

//================product getById=================================================
app.get("/product/:id", (req,res)=>{
  var productId=req.params.id;
  Product.findById({_id:productId},function(err,result){
    if(err){
      res.send(String(err))
    }res.send(result)
  })
})

//=================product update=================================================
app.put("/product/:id",(req,res)=>{
  var upd=req.body;
  Product.findOneAndUpdate({_id:req.params.id},upd,function(err,result){
    if(err){
      res.send(String(err))
    }res.send(result)
  })
})

//==================product delete=================================================
app.delete("/product/:id", (req,res)=>{
  var del=req.params.id;
  Product.findByIdAndDelete({_id:del}, function(err,result){
    if(err){
      res.send(String(err));
    }res.send(result);
  })
})


app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})
