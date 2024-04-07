async function giveMeFencesArray(page) {


let fenceSelector =".Nv2PK.tH5CWc.THOPZb "


  // now checking
  let fenceBodyTextSelector =
    ".mapsConsumerUiSubviewSectionGm2Placesummary__text-content";


    let titleSelector = ".qBF1Pd.fontHeadlineSmall"

// info line is a div and will have two children one containing address and second containing the phone number
// let infoline = ".mapsConsumerUiSubviewSectionGm2Placesummary__info-line";
    let infoline = ".UaQhfb.fontBodyMedium > .W4Efsd"

  let fenceLink = ".hfpxzc";

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


        let contact = fence.querySelectorAll(infoline)[1]?.children[1]?.textContent?.trim();
        
        // const info = infoRawElement[1].textContent.trim();
        

        let infoArray = infoRaw.split("·");

        let contactToPush = infoArray[infoArray.length - 1].trim();
        if (!contactToPush.includes("+")) {
          contactToPush = "none";
        }


        try {
          info = {
            type: infoArray[0].trim() || "none",
            address: infoArray[1].trim() || "none",
            contact: contactToPush,
          };
        } catch (err) {
          console.log("error while info triming", err.textContent);
        }

        let firstIndex = link.indexOf("!3d");
        let lastIndex = link.indexOf("?");
        let croppedLatANDlong = link.slice(firstIndex, lastIndex);
        let latANDLong = croppedLatANDlong
          .replace("!3d", "")
          .replace("!4d", ",");
        let ArrayedlatANDLong = latANDLong.split(",");
        ArrayedlatANDLong[1] = ArrayedlatANDLong[1].split("!")[0];

     
        return { ArrayedlatANDLong, title, info };
      });

      return arrayofFences;
    },
    { fenceSelector, titleSelector, infoline, fenceLink }
  );

  return data;
}

module.exports = giveMeFencesArray;
