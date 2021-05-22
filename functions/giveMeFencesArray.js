async function giveMeFencesArray(page) {
// let fenceSelector =
// ".mapsConsumerUiSubviewSectionGm2Placeresultcontainer__result-container.mapsConsumerUiSubviewSectionGm2Placeresultcontainer__two-actions.mapsConsumerUiSubviewSectionGm2Placeresultcontainer__wide-margin";


let fenceSelector =".V0h1Ob-haAclf.gd9aEe-LQLjdd.OPZbO-KE6vqe"


  // now checking
  let fenceBodyTextSelector =
    ".mapsConsumerUiSubviewSectionGm2Placesummary__text-content";
// let titleSelector =
// ".mapsConsumerUiSubviewSectionGm2Placesummary__title-container";


    let titleSelector = ".qBF1Pd-haAclf"

  // info line is a div and will have two children one containing address and second containing the phone number
// let infoline = ".mapsConsumerUiSubviewSectionGm2Placesummary__info-line";
    let infoline = ".ZY2y6b-RWgCYc"

  let fenceLink = ".place-result-container-place-link";

  let data = await page.evaluate(
    ({ fenceSelector, titleSelector, infoline, fenceLink }) => {
      // extracting link starts
      let fences = Array.from(document.querySelectorAll(fenceSelector));

      let arrayofFences = fences.map((fence) => {
        let link = fence.querySelector(fenceLink).href;
        let titleElement = fence.querySelector(titleSelector);
        let title;
        if (typeof titleElement !== undefined) {
          title = titleElement.textContent.trim();
        }

        let infoRawElement = fence.querySelectorAll(infoline);
        let infoRaw;
        if (infoRawElement.length !== 0) {
          infoRaw = infoRawElement[1].textContent.trim();
        }

        // let contact = fence.querySelectorAll(infoline)[1].children[2].textContent.trim();
        //
        //

        let infoArray = infoRaw.split("·");

        let contactToPush = infoArray[infoArray.length - 1].trim();
        if (!contactToPush.includes("+")) {
          contactToPush = "none";
        }

        let info = {};

        try {
          info = {
            type: infoArray[1].trim() || "none",
            address: infoArray[2].trim() || "none",
            contact: contactToPush,
          };
        } catch (err) {
          console.log("error while info triming", err.textContent);
        }

        // now grabbing the lat and long from it.
        let firstIndex = link.indexOf("!3d");
        let lastIndex = link.indexOf("?");
        let croppedLatANDlong = link.slice(firstIndex, lastIndex);
        let latANDLong = croppedLatANDlong
          .replace("!3d", "")
          .replace("!4d", ",");
        let ArrayedlatANDLong = latANDLong.split(",");
        //grabbing  lat and long ends

        return { ArrayedlatANDLong, title, info };
      });
      // let link =  fences[5].querySelector(fenceLink).href;

      return arrayofFences;
    },
    { fenceSelector, titleSelector, infoline, fenceLink }
  );

  return data;
}

module.exports = giveMeFencesArray;
