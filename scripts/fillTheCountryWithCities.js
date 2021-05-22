const puppeteer = require("puppeteer");
const City = require("../Models/City")
const Country = require("../Models/Country")


const connectDB  = require('../database')

let CountryName = "united States";
let CountryCode = "US" //make sure to change this will be stored in db

connectDB()

async function fillCities(CountryName , CountryCode){
    // Launch a clean browser
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    //open url
    await page.goto("https://www.google.com");
await page.type('input[aria-label="Search"]', `cities in ${CountryName} wikipedia by population`);

await page.keyboard.press("Enter");


    await page.waitForSelector('.yuRUbf');

    var selectorString = '.yuRUbf';
            var selector = await page.$(selectorString);
    if (selector!=null) {
                var element = selector.asElement();
                await element.click();

        //now selecting the table in wikipedia
// await page.waitForSelector('#footer-info-lastmod');
// await page.waitForNavigation();

        await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
]);






// const numberOfCities = await page.evaluate(() => { let arrayOfTr = Array.from(document.querySelectorAll(".wikitable")[1].querySelector("tbody").querySelectorAll("tr"));
// return  arrayOfTr.length
// })


// let nameOfCity =  await page.evaluate((numberOfCities) => {

// let listOfCities = []
// for(let i = 0; i<= numberOfCities; i++) {
// let city = document.querySelectorAll(".wikitable")[1].querySelector("tbody").querySelectorAll("tr")[i].querySelectorAll("td")[1].querySelector("a").innerText;
// listOfCities.push(i)
// }


// return  listOfCities
// } , numberOfCities )




// console.log(nameOfCity)


        const arrayOfTheCities = await page.$$eval("table:nth-of-type(5) > tbody > tr" , tr => {
         let indexes =  tr.map((tr , index) => {
// return tr.children[1].firstChild.textContent;
             return tr.children[1].firstChild.textContent;
            })
            return indexes
        })

// console.log(nameOfcities)

            try{

            
        arrayOfTheCities.forEach(city => {
        const newCity = new City({
            name: city, 
            country: CountryCode, 
hospitals :[],
jails : []
        })





            newCity.save().then(savedCity => {
                console.log("city saved into db " , savedCity.name)
                Country.findOne({_id: CountryCode}).then(country => {
                    if(country == null) {
                        return console.log("None of the country is in country collection named as " , CountryCode)
                    }

                    country.cities.push(savedCity._id);
                    country.save().then((updatedCountry => {
                        console.log("city also has been refered inside country document" , savedCity.name)
                    }))

                }).catch(err => console.log(err))

            }).catch(err => {
                console.log("err while saving into db " , err)
            })
        })




            }catch(err) {

            }


    



            }
    

    //close the browser now
    await browser.close()

};


fillCities(CountryName , CountryCode)
