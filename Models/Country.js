
const mongoose = require("mongoose")

const countrySchema = new mongoose.Schema({
    _id: {
        type:String

    }, 
    name: {

        type: String
    },
    cities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "city"
    }]
})


module.exports = mongoose.model("country" , countrySchema) 
