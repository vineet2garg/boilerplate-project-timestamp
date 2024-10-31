// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// your first API endpoint... 
app.get("/api", function (req, res) {
  const currentDate = Date.now();
  res.status(200)
    .json(
      {
        unix: currentDate,
        utc: new Date(Number(currentDate)).toUTCString()
      }
    );
});

// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  const date = req.params.date;

  if (Date.parse(date)) {
    const unitTimestamp = Date.parse(date);
    const utcDate = new Date(Number(unitTimestamp)).toUTCString();

    res.status(200)
      .json(
        {
          unix: unitTimestamp,
          utc: utcDate
        }
      );
  } else {
    const utcDate = new Date(Number(date)).toUTCString();
    console.log(utcDate);

    if (utcDate !== 'Invalid Date') {
      res.status(200)
        .json(
          {
            unix: Number(date),
            utc: utcDate
          }
        );
    } else {
      res.status(400)
        .json(
          {
            error: "Invalid Date"
          }
        );
    }
  }
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
