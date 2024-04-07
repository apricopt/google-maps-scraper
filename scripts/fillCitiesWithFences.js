const puppeteer = require("puppeteer");
const City = require("../Models/City");

const nextButtonClickerGoogleMap = require("../functions/nextButtonClickerGoogleMap");

const connectDB = require("../database");
const giveMeFencesArray = require("../functions/giveMeFencesArray");
const saveFencesIntoDB = require("../functions/saveFencesIntoDB");

connectDB();

async function getFences(country, cityName, placeType) {
  // Launch a clean browser
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({
    width: 2920,
    height: 4080,
  });
  await page.setDefaultNavigationTimeout(0);
  page.on("console", (msg) => console.log(msg.text()));
  // Now open the url
  await page.goto("https://www.google.com/maps");
  await page.type("#searchboxinput", `${placeType} in ${cityName}`);
  await page.keyboard.press("Enter");

  // now we are on google map

  const scrollable_section = ".m6QErb.WNBkOb";
  const TheMainPanSelector = ".section-layout.section-scrollbox";

  let nextButtonSelector = 'button[aria-label=" Next page "]';
  try {
    await page.waitForSelector(scrollable_section);
    // await page.waitForSelector(nextButtonSelector);
  } catch (err) {
    console.log("Unable to find the scrollable section or the next button");
    return false;
  }
  let reachedLimit = false;

  async function doWhile(country, city, placeType) {
    // do {
    let FencesArray = [];
    FencesArray = await giveMeFencesArray(page);
    console.log("THIS IS FENCES ARRAY ", FencesArray);
    await saveFencesIntoDB(country, city, FencesArray, placeType);

    // } while (!reachedLimit);
    console.log("We are done with this city");
  }

  await doWhile(country, cityName, placeType);

  await browser.close();

  //geoFences function ends here
}

//the cityName will come from the city

async function executeOnThisArrayOfCities(cities) {
  for (const [index, city] of cities.entries()) {
    console.log(
      `Getting ${city.name}'s hospitals [${index + 1}/${cities.length}]`
    );
    await getFences(city.country, city.name, "hospitals");
    console.log(
      `Getting ${city.name}'s police Stations [${index + 1}/${cities.length}]`
    );
    await getFences(city.country, city.name, "police");

    City.findOne({ name: city.name }).then((navaCity) => {
      navaCity.automated = true;
      navaCity
        .save()
        .then((updatedcity) =>
          console.log(`${updatedcity.name} has been marked as Automated!!`)
        );
    });
  }

  console.log("Thanks For any queries contact apricopt@gmail.com");
}

// execution starts

City.find({ country: "US", automated: false })
  .lean()
  .then((cities) => {
    executeOnThisArrayOfCities(cities);
  })
  .catch((err) => console.log(err));
