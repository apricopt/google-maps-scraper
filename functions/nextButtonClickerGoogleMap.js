async function nextButtonClickerGoogleMap(page, nextButtonSelector) {
// let paginationSelector = ".mapsConsumerUiSubviewSectionGm2Pagination__left";
    //
    //
    let paginationSelector = ".Jl2AFb"

    try {
  await page.waitForSelector(nextButtonSelector);

    }catch(err) {
        console.log("Button Selector not found getting it out");
        return false
    }

  await page.waitForSelector(".show-loading", {
    hidden: true,
  });

  try {
    await page.waitForTimeout(2000);
    await page.waitForSelector(nextButtonSelector);
    await page.click(nextButtonSelector);
    console.log("Next Button clicked");
  } catch (err) {
    console.log("error while clicking button ", err);
      return false;

  }

  await page.waitForSelector(".show-loading", {
    hidden: true,
  });

    await page.waitForSelector(paginationSelector);

    try{
  console.log(
    `Next Set loaded ${await page.$eval(
      paginationSelector,
      (elem) => elem.textContent
    )}`
  );

    }catch(err) {
        console.log("error while finding pagination " , err)
        return false
    }
}

module.exports = nextButtonClickerGoogleMap;
