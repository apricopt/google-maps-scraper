const Geofence = require("../Models/Geofence")
const mongoose = require("mongoose");

const connectDB = require("../database")





connectDB(); 




let fenceToAdd = {
    countryCode : "PK", 
    name: "Desi haspataal " , 
    address : "glau number hik chakra" , 
    radius : 20,
    fenceType : "hospital" ,
    location : {
        coordinates : [72.975650 ,  33.589129]
    }
}



// saving it into mongodb using mongoose

const geofence =  new Geofence(fenceToAdd);
geofence.save().then(savedfence => {
    console.log("Geofence saved " , savedfence.name )
}).catch(err => console.log("error occured", err
))


