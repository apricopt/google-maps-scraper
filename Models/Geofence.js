const mongoose = require("mongoose")


const geofenceSchema = new mongoose.Schema({
    countryCode: {
        type: String,
// required: true
    },
    city: {
        type: String, 

    }, 
    name: {
        type:String, 

    }, 
    info : {
        type: {
            type:String
        }, 
        address : {
            type:String
        },
        contact : {
            type: String
        },

    }, 
    notifyOnExit : {
        type: Boolean,
        default: true,

    },
    notifyOnEnter : {
        type: Boolean,
        default: true,
    },
    radius: {
        type: Number,
        default: 100
    },
    fenceType: {
        type: String,
// required : true,
    },
    location : {
        type: {
        type: String , 
        enum : ["Point"] , 
        }, 
        coordinates : {
            type : [Number] ,
        }, 
    }
})

geofenceSchema.index({ location: '2dsphere' });


// module.exports = mongoose.model("geofence" , geofenceSchema)
module.exports = geofenceSchema
