// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/", function(req, res){
  let date = new Date();
  res.json({unix:date.getTime(), "utc": date.toUTCString()})
})

app.get("/api/timestamp/:date_string", function (req, res){ 
  let date = "";
  
  if(isNaN(req.params.date_string) && new Date(req.params.date_string) != "Invalid Date"){
    date = new Date(req.params.date_string)
    res.json({unix:date.getTime(), "utc": date.toUTCString()})
  } else if(parseInt(req.params.date_string, 10)){
    let unixTime = parseInt(req.params.date_string, 10);
    let unixDate = new Date(unixTime);
    console.log("parsed int date", date);
    res.json({unix:unixDate.getTime(), "utc": unixDate.toUTCString()})
  } else {
    res.json({"error" : "Invalid Date" })
    console.log('yo')
  }
    
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
