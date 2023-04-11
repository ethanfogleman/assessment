const express = require("express");
const app = express();
const getZoos = require("./utils/getZoos");

// Middleware
const validateZip = require("./middleware/validateZip");

// Routes
app.get("/zoos/all",
  (req, res, next) => {
  const stateOfAdmin = req.query.admin;
  if (stateOfAdmin === 'true') {
    const allZoos = getZoos();
    res.send(`All zoos: ${allZoos.join(`; `)}`);
    } else {
      res.send("You do not have access to that route.")
    }
  }
);

app.get(
  "/check/:zip", 
  validateZip,
  (req, res, next) => {
    const zip = req.params.zip;
    const response = getZoos(zip);
    if (response) {
      res.send(`${zip} exists in our records.`);
    } else {
      res.send(`${zip} does not exist in our records.`);
    }
  }
);

app.get("/zoos/:zip", validateZip, (req, res, next) => {
  const zip = req.params.zip;
  const response = getZoos(zip);
  if (!response || response.length === 0) {
    res.send(`${zip} has no zoos.`);
  } else {
    res.send(`${zip} zoos: ${response.join(`; `)}`);
  }
});

// Error Handling
app.use((req, res, next) => {
  res.send("That route could not be found!");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.send(err);
});

module.exports = app;