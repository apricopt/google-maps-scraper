
const City = require("../Models/City")




async function saveFencesIntoDB(country , city,fencesArray , placeType) {



    let fenceType;
    if(placeType == "hospitals"){
        fenceType = "hospitals"
    }else if(placeType == "police"){
        fenceType = "jails"
    }

     City.findOne({name: city}).then(city => {
        if(city == null) {
            return console.log(city , " none of the city exist into db")
        }

         
        let previousArray = city[fenceType];
     
        arrayToPush = fencesArray.map(fence => {
            return  {
                countryCode: country,
                city: city.name,
                name: fence.title,
                info: {
                    type: fence.info.type,
                    address : fence.info.address,
                    contact : fence.info.contact
                },
                fenceType: fenceType, 
                location : {
                    type:"Point", 
                    coordinates: fence.ArrayedlatANDLong.reverse().map(coord => parseFloat(coord)), 
                }

            }
        });

         


       let  finalArrayToSave =  [...previousArray , ...arrayToPush];
        city[fenceType] = finalArrayToSave;
        city.save().then(result => {
            console.log(`${fenceType} has been inserted into GoodFam Database of city ${result.name}` )
            console.log(`Hospitals : ${result.hospitals.length} And Jails : ${result.jails.length}`)
        }).catch(err => console.log("error while saving " , err));

        







    }).catch(err => console.log(err))

}



module.exports = saveFencesIntoDB
