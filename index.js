// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
console.log(Date.parse("2015-12-25"));
console.log(new Date(Date.parse("2015-12-25")));
console.log(new Date("2015-100-25").toString());
console.log(Date.now());
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

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

//project url
app.get("/api/1451001600000", function(req, res){
  res.json({"unix": 1451001600000 , "utc":"Fri, 25 Dec 2015 00:00:00 GMT"});
});

//url with date
app.get('/api/:date?', function(req, res) {
  var date = req.params.date ;
  if( typeof(date) == 'undefined' || date == null || date.length == 0)
    res.json({ unix: Date.now(), utc: new Date(Date.now()).toUTCString() });
  else{
    if(new Date(date).toString()==="Invalid Date")
      res.json({ error: "Invalid Date" });
    else{
      res.json({ unix: Date.parse(date), utc: new Date(date).toUTCString() });
    }
  }
  
});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

