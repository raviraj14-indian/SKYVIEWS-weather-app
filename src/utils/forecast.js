const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const WEATHERSTACK_ACCESS_KEY = "7c91e72289535e28849632c6cc508712";
  const WEATHERSTACK_URL = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_ACCESS_KEY}&query=${latitude},${longitude}&unit=m`;

  request({ url: WEATHERSTACK_URL, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to Weather Service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees outside. It feels like ${body.current.feelslike} degree.`,
        body.current
      );
    }
  });
};

module.exports = forecast;
