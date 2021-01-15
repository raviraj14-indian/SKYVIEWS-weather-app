const request = require("request");

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1Ijoic29tZW9uZWdyZWF0IiwiYSI6ImNrZjYwOHJhbzA5bGEycnFna2FpcWo3Y2YifQ.sCX4KcYgjCOJ7Ly3TOcNEw";

// to find coordinates from location name provided
const forward = (address, callback) => {
  const MAPBOX_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${MAPBOX_ACCESS_TOKEN}`;

  request({ url: MAPBOX_URL, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to Geolocation Services.", undefined);
    } else if (body.features.length === 0) {
      callback(
        "Unable to find location. Try again with different search.",
        undefined
      );
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

// to find location name from coordinates
const reverse = (latitude, longitude, callback) => {
  const MAPBOX_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_ACCESS_TOKEN}&limit=1&types=place`;

  request({ url: MAPBOX_URL, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to Geolocation Services.", undefined);
    } else if (body.features.length === 0) {
      callback(
        "Unable to find location. Try again with different search.",
        undefined
      );
    } else {
      callback(undefined, {
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = {
  forward,
  reverse,
};
