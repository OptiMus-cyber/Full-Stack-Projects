const fs = require("fs");
fs.readFile('../frontend/src/assets/unitedAirlines.jpg',"base64",(err,data)=>{
    fs.writeFile('ImageBase64.txt','data:image/jpeg;base64,'+data,(err)=>{
        console.log("Some error occured")
    })
})