const puppeteer = require("puppeteer");
const City = require("../Models/City");
const Country = require("../Models/Country");

const connectDB = require("../database");

let CountryName = "united States";
let CountryCode = "US";

connectDB();

async function fillCities(CountryName, CountryCode) {
  // Launch a clean browser
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  //open url
  await page.goto("https://www.google.com");
  await page.type(
    'textarea[aria-label="Search"]',
    `cities in ${CountryName} wikipedia by population`
  );

  await page.keyboard.press("Enter");

  await page.waitForSelector(".yuRUbf");

  var selectorString = ".yuRUbf";
  var selector = await page.$(selectorString);
  if (selector != null) {
    var element = selector.asElement();
    await element.click();

    await Promise.all([page.waitForNavigation({ waitUntil: "networkidle0" })]);

    const arrayOfTheCities = await page.$$eval(
      "table:nth-of-type(4) > tbody > tr",
      (tr) => {
        let indexes = tr.map((tr, index) => {
          return tr.children[1].firstChild.textContent;
        });
        return indexes;
      }
    );

    console.log("Array of cities ", arrayOfTheCities);

    try {
      const newCountry = new Country({
        _id: CountryCode,
        name: CountryName,
        cities: [],
      });
      newCountry
        .save()
        .then((savedCountry) => {
          console.log("Country saved into db ", savedCountry.name);
        })
        .catch((err) => console.log(err));

      arrayOfTheCities.forEach((city) => {
        const newCity = new City({
          name: city,
          country: CountryCode,
          hospitals: [],
          jails: [],
        });

        newCity
          .save()
          .then((savedCity) => {
            console.log("city saved into db ", savedCity.name);
            Country.findOne({ _id: CountryCode })
              .then((country) => {
                country.cities.push(savedCity._id);
                country.save().then((updatedCountry) => {
                  console.log(
                    "city also has been refered inside country document",
                    savedCity.name
                  );
                });
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => {
            console.log("err while saving into db ", err);
          });
      });
    } catch (err) {}
  }

  //close the browser now
  await browser.close();
}

fillCities(CountryName, CountryCode);
