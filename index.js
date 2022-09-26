const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

// https.get("https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=9136704afe86176fc4ff6e3d8679edf3&units=metric", function(response){
//     response.on("data",function(data){
//        const weatherData  = JSON.parse(data);
//        
       
//        
//        res.write("<p> The Temperature is " + weatherData.main.temp + "</p>" );
//        res.write("<img src=" + icn + ">");

//        res.send();
//     })
//    })


app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res){
    console.log(req.body);
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + req.body.city + "&appid=9136704afe86176fc4ff6e3d8679edf3&units=metric";
    
    https.get(url, function(response){
        response.on("data", function(data){
            weatherData = JSON.parse(data);
            const icn = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
            res.write("<h1>The Temp of " + req.body.city + " is " + weatherData.main.temp + "</h1>");
            res.write("<h2>" + weatherData.weather[0].description + "</h2>");
            res.write("<img src ="+ icn +">");
            res.send();
        })
    })
})



app.listen(3000, function(){
    console.log("Server Working;");
})