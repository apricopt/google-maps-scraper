const mongoose = require("mongoose")
const geofenceSchema = require("./Geofence")

const citySchema = new mongoose.Schema({
    name: {
        type: String
    },
    country: {
        type:mongoose.Schema.Types.String,
        ref: "country"

    }, 
    hospitals : [geofenceSchema],
    jails: [geofenceSchema], 

    automated : {
        type:Boolean,
        default : false
    }
})






module.exports = mongoose.model("city" , citySchema) 
