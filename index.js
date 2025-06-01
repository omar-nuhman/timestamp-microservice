var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", function (req, res) {
  const dateParam = req.params.date;

  let date;

  // Case 1: If no date is provided, return current date
  if (!dateParam) {
    date = new Date();
  } 
  // Case 2: If input is a number (milliseconds), parse it as number
  else if (!isNaN(dateParam) && /^\d+$/.test(dateParam)) {
    date = new Date(parseInt(dateParam));
  } 
  // Case 3: Input is string like "2015-12-25"
  else {
    date = new Date(dateParam);
  }

  // If invalid, return error
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Listener
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
