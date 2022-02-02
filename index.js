const express = require ("express");
require('dotenv').config();
const mongoose = require("mongoose");
const Students = require("./model/students");
const app = express();
app.use(express.json());





const MONGODBURL = process.env.MONGODBURL
mongoose.connect(MONGODBURL,()=>{
    console.log("database connected successsfuly")
})
const PORT = process.env.PORT|| 5000
app.listen(PORT,()=>{
    console.log('server running on PORT 5000')

})

// Create new student
app.post("/register",(req, res)=>{
    const {firstName, lastName, email, address, phoneNumber} = req.body;
    const newStudent = new Students({firstName, lastName, email, address, phoneNumber}) 
        newStudent.save()
        res.send("saved successfully")    
})

// Get all students from database
app.get("/students", async (req, res) => {
    const students = await Students.find();
    res.json(students);
})

// Find student by ID
app.get("/student/:id", async(req, res) => {
    
    try {
      const student = await Students.findById(req.params.id)

      if(!student) 
          return res.status(404).json({msg: 'This student does not exist.'})

      return res.status(200).json(student)
  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
})

// Find student by ID and update
app.put('/edit/:id', async (req, res) => {
    const {firstName, lastName, email, address, phoneNumber} = req.body;

    const student = await Students.findByIdAndUpdate(req.params.id, {firstName, lastName, email, address, phoneNumber})
    
    if (!student) {
        return res.status(404).json({msg: "This student does not exist"})
    }

     return res.status(200).json({msg: "updated successfully"})
})

// Delete a single student
app.delete("/student/:id", async (req, res) => {
    const student = await Students.findByIdAndDelete(req.params.id)

    if (!student) {
        return res.status(404).json({msg: "This Student does not exist"})
    }

        return res.status(200).json({msg: "Deleted Successfully"})
})