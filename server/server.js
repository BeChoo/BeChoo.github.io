const express = require('express');
const mongoose = require('mongoose')
const cors = require("cors")
const EmployeeModel = require('./models/Employee')

const app = express();
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://chasecalero:chasecalero@gotel.pkl54mr.mongodb.net/Gotel?retryWrites=true&w=majority")
.then(() =>{
  console.log("mongodb connected");
})
.catch(() =>{
  console.log("connection failed");
})

app.post("/login", (req, res) => {
  const {email, password} = req.body
  EmployeeModel.findOne({email: email})
  .then(user => {
    if (user){
        if(user.password === password){
          res.json("Success")
        }else{
          res.json("The password is incorrect")
        }
    }else{
      res.json("No record exists")
    }
  })
})

app.post('/register', (req, res) => {
  EmployeeModel.create(req.body)
  .then(employees => res.json(employees))
  .catch(err => res.json(err))
})

//const PORT = process.env.PORT || 5000;



app.listen(3001, () => {
  console.log(`Server is running`);
});
