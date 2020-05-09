//Dependencies
//===========================================================================
let express = require("express");
let path = require("path");
let http =  require('http');

let PORT = process.env.PORT || 3000;
//Express App
//========================================================================

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Reservation Data
//========================================================================

let reservations = [
  {
    routeName: "Table #1",
    ID: "1234",
    Name: "Tester McTesterson",
    Email: "test1@email.com",
    Phone: "8015555555"
  },
  {
    routeName: "Table #2",
    ID: "1234",
    Name: "J. McTesterson",
    Email: "test2@email.com",
    Phone: "8015555555"
  },
  {
    routeName: "Table #3",
    ID: "1234",
    Name: "John McTesterson",
    Email: "test3@email.com",
    Phone: "8015555555"
  },
  {
    routeName: "Table #4",
    ID: "1234",
    Name: "Jane McTesterson",
    Email: "test4@email.com",
    Phone: "8015555555"
  },
  {
    routeName: "Table #5",
    ID: "1234",
    Name: "Jim McTesterson",
    Email: "test5@email.com",
    Phone: "8015555555"
  },
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/index", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reservations", function(req, res) {
  res.sendFile(path.join(__dirname, "reservations.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});


// Displays all reservations
app.get("/api/reservations", function(req, res) {
// app.get("/reservations", function(req, res) {
  return res.json(reservations);
});

// Displays all tables
app.get("/api/tables", function(req, res) {
// app.get("/tables", function(req, res) {
  return res.json(tables);
});


// Displays a single reservation, or returns false
app.get("/api/reservations/:reservations", function(req, res) {
// app.get("/reservations/:reservations", function(req, res) {
  var resDetails = req.params.reservations;

  console.log(resDetails);

  for (var i = 0; i < reservations.length; i++) {
    if (resDetails === reservations[i].routeName) {
      return res.json(reservations[i]);
    }
  }

  return res.json(false);
});

// Create New reservations - takes in JSON input
app.post("/api/reservations", function(req, res) {
// app.post("/reservations", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newReservation = req.body;

  // Using a RegEx Pattern to remove spaces from newReservation
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

  console.log(newReservation);

  reservations.push(newReservation);

  res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
