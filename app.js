const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.get("/weather", function(req, res){
    res.sendFile(__dirname + "/weather.html");
});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKEY = "deeb622ff37d3ed8161a59d4e58277ae"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKEY + "&units=metric"
    https.get(url, function(response){

    response.on("data", function(data){
       const weatherData = JSON.parse(data)
       const temp = weatherData.main.temp
       const weatherDescription = weatherData.weather[0].description
       const icon = weatherData.weather[0].icon
       const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
       
       res.write("<p>The weather is currently " + weatherDescription + "</p>");
       res.write("<h1> The temperature in " + query +  " is " + temp + " degrees celsius.</h1>");
       res.write("<img src=" + imageURL + ">");
       res.write("<a href='/'>Back to Weather Calculation</a>");
       res.send();
    });
});
});




app.listen(3000, function() {
    console.log("Server run on port 3000.");
});