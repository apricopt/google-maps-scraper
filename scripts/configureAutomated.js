const City = require("../Models/City");
const connectDB = require("../database")



connectDB();

String.prototype.toObjectId = function() {
  var ObjectId = (require('mongoose').Types.ObjectId);
  return new ObjectId(this.toString());
};

// Every String can be casted in ObjectId now

let startingID = "60a7805a059c57080ae63384".toObjectId();
let lastID = "60a7805a059c57080ae6344b".toObjectId()



City.find({ _id: { $gt: startingID, $lte: lastID } }).then(results => {

    console.log(results.length)
    results.forEach(result => {
        result.automated = false;
        result.save().then(city => console.log("City has been falsed" , city.name));
    })


}).catch(err => console.log("err" , err))
