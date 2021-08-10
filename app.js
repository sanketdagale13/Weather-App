const express =  require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res){
  res.sendFile(__dirname+ "/index.html")
});


app.post("/", function(req, res){
  const query =req.body.city;
  const apiKey = "6b3294908c17781840c7a030810ad1fe";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units=metric";

  https.get(url, function( response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp =weatherData.main.temp;
      //console.log(temp);
      const icon = weatherData.weather[0].icon;
      const imageurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

      const description = weatherData.weather[0].description;
      console.log(description);
        res.write("<h1>The tempereture in "+query+" is " + temp  + " degree celcius   </h1>" );
        res.write("<p>The Weather currently is " + description +"</p>");
        res.write("<img src="+imageurl+">");
        res.send();
    });
  });

});



app.listen(3000, function(){
  console.log("Server is running at port 3000");
});
