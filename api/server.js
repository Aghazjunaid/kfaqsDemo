const express = require('express');
const bodyParser= require('body-parser');
var mongoose = require('mongoose');
var extend = require('extend');
const bcrypt = require('bcrypt');
const app = express();
const port = 5000;

const User = require("./Schema/User");

var mongodbUrl = 'mongodb://127.0.0.1/fame';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect(mongodbUrl, {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex:true
});

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


app.post('/login', async(req , res) => {
  try {
    const user = await User.findOne({email:req.body.email});
    if(user) {
      if(user.password === req.body.password) {
        res.status(200).send("valid login details");
      } else {
        res.status(401).send("Invalid credentials!");
      }
    } else {
      res.status(404).send("User not found")
    }
  } catch (error) {
    res.status(400).send("Invalid credentials!")
  }
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})
