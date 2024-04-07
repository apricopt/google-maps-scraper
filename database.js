
const mongoose = require("mongoose")
const connectDB = () => {
  mongoose.connect("mongodb://0.0.0.0:27017/automation").then(()=>{
    console.log("Connected to the database ")
  }).catch((error) => {
    console.log(error)
  })
};


module.exports = connectDB

// connectDB();
