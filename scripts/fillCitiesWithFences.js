const puppeteer = require("puppeteer");
const City = require("../Models/City");

const nextButtonClickerGoogleMap = require("../functions/nextButtonClickerGoogleMap");

const connectDB = require("../database");
const giveMeFencesArray = require("../functions/giveMeFencesArray");
const saveFencesIntoDB = require("../functions/saveFencesIntoDB");

connectDB();






async function getFences(country , cityName , placeType) {
  // Launch a clean browser
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 3080,
  });
  await page.setDefaultNavigationTimeout(0);
  page.on("console", (msg) => console.log(msg.text()));
  // Now open the url
  await page.goto("https://www.google.com/maps");
  await page.type(
    'input[aria-label="Search Google Maps"]',
    `${placeType} in ${cityName}`
  );
  await page.keyboard.press("Enter");

  // now we are on google map

  const scrollable_section = ".section-layout .section-scrollbox";
  const TheMainPanSelector = ".section-layout.section-scrollbox";
  //   let nextButtondisabledSelector =
  //     "button.mapsConsumerUiSubviewSectionGm2Pagination__button-disabled";
// let nextButtonSelector =
// "#mapsConsumerUiSubviewSectionGm2Pagination__section-pagination-button-next";

 let nextButtonSelector =   'button[aria-label=" Next page "]'
    try{
  await page.waitForSelector(scrollable_section);
  await page.waitForSelector(nextButtonSelector);

    }catch(err) {
        return false

    }
  let reachedLimit = false;

  async function doWhile(country , city , placeType) {
    do {
      let FencesArray = [];
      FencesArray = await giveMeFencesArray(page);
      await saveFencesIntoDB(country , city , FencesArray , placeType);
console.log(FencesArray.length);

      let disabled = await page.$eval(
        nextButtonSelector,
        (button) => button["disabled"]
      );

      if (!disabled) {
      let clickedResult =  await nextButtonClickerGoogleMap(page, nextButtonSelector);
          if(clickedResult == false){
              return false
          }
      } else {
        reachedLimit = true;
      }
    } while (!reachedLimit);

    console.log("all data has been loaded thanks for using zohaib's script");
  }

  await doWhile(country, cityName , placeType);


await browser.close();

  //geoFences function ends here
}

//the cityName will come from the city


async function executeOnThisArrayOfCities(cities){
 for (const [index , city ] of cities.entries()) {
    console.log(`Getting ${city.name}'s hospitals [${index+1}/${cities.length}]`)
 await getFences(city.country , city.name , "hospitals");
    console.log(`Getting ${city.name}'s police Stations [${index+1}/${cities.length}]`)
 await getFences(city.country , city.name , "police");

     City.findOne({name: city.name}).then(navaCity => {
         navaCity.automated = true;
         navaCity.save().then(updatedcity => console.log(`${updatedcity.name} has been marked as Automated!!`));
     });

  }

    console.log("Thanks For any queries contact xadxeb@gmail.com")

}



// execution starts


City.find({country: "US", automated: false}).lean().then(cities => {
executeOnThisArrayOfCities(cities)
}).catch(err => console.log(err))


