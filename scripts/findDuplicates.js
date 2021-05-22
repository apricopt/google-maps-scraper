let  karunga = new Promise((resolve , reject) => {
    if(true){
        resolve();
    }else {
        reject();
    } 

});




karunga.then(() => {


    function haha(arg) {
        console.log("haha " , arg )
        
    }

    return  haha;

}).then((bool) => {

    bool("kya")



}).catch(() => console.log("SOlve nahi hwa"))

