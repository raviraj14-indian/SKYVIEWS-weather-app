const path = require("path");
const express = require("express");
const hbs = require("hbs");

const { forward, reverse } = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = 3000;

// Defining Paths for public, views, partials directory
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsDirectoryPath = path.join(__dirname, "../templates/views");
const partialsDirectoryPath = path.join(__dirname, "../templates/partials");

// Setting public directory
app.use(express.static(publicDirectoryPath));

// Setting up handlebars and template directories
app.set("view engine", "hbs");
app.set("views", viewsDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);

// Setting up Routes
app.get("", (req, res) => {
  res.render("index", {
    title: "Forecast",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;
  if (!address) {
    if (!latitude || !longitude) {
      return;
    }
    // called automaticly by browser if user shares location
    reverse(latitude, longitude, (error, { location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData, current) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          location,
          forecastData,
          current,
        });
      });
    });
    return;
  }

  // called when user search for location
  forward(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastData, current) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        location,
        forecastData,
        current,
      });
    });
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
