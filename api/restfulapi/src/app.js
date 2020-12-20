const express = require("express");
const app = express();
const Student = require("./models/students");
require("./db/conn");
const port = process.env.PORT || 8000;

app.use(express.json());

app.post("/students",(req,res) => {
    const user = new Student(req.body);
    user.save().then(() => {
        res.status(201).send(user);
    }).catch((e) =>{
      res.status(401).send(e);
    })
})

app.get("/students", async(req, res) =>{
    try{
        const  studentsData = await Student.find();
        res.send(studentsData);
    }catch(e){
        res.send(e);
    }
})

app.patch("/students/:id", async (req, res) =>{
try{
const _id = req.params.id;
const updatestudentsData = await Student.findByIdAndUpdate(_id, req.body);
res.send(updatestudentsData);
}catch(e){
    res.status(400).send(e);
}
})




app.listen(port, () => {
    console.log("connection is setup at ${port}");
})