const express = require("express");
const https = require("https");
const app = express();

app.get("/", function(req,res){
    https.get("https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=9136704afe86176fc4ff6e3d8679edf3&units=metric", function(response){
     response.on("data",function(data){
        const weatherData  = JSON.parse(data);
        console.log(weatherData.weather[0].description);
     })
    })
    res.sendFile(__dirname + "/index.html");
})


app.listen(3000, function(){
    console.log("Server Working;");
})