console.log("Client side Javascript Loaded");

// Importing Elements from html
const address = document.querySelector(".address");
const form = document.querySelector(".search");
const input = document.querySelector(".search input");
const temperature = document.querySelector(".temperature span");
const description = document.querySelector(".summary h4");
const wind = document.querySelector(".wind");
const dir = document.querySelector(".dir");
const humidity = document.querySelector(".humidity");
const feelsLike = document.querySelector(".feels-like");

// Function to print weather details on user's page
const printWeather = (data) => {
  if (data.error) {
    return (address.textContent = data.error);
  }
  address.textContent = data.location;
  temperature.textContent = data.current.temperature;
  description.textContent = data.current.weather_descriptions[0];
  humidity.textContent = data.current.humidity;
  feelsLike.textContent = data.current.feelslike;
  wind.textContent = data.current.wind_speed;
  switch (data.current.wind_dir) {
    case "N":
      dir.textContent = "North";
      break;

    case "E":
      dir.textContent = "East";
      break;

    case "S":
      dir.textContent = "South";
      break;

    case "W":
      dir.textContent = "West";
      break;

    default:
      dir.textContent = data.current.wind_dir;
  }
};

// If user allow to share location
navigator.geolocation.getCurrentPosition((position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  address.textContent = "Loading...";
  fetch(
    `http://localhost:3000/weather?latitude=${latitude}&longitude=${longitude}`
  ).then((response) =>
    response.json().then((data) => {
      printWeather(data);
    })
  );
});

// If user searches a location
form.addEventListener("submit", (e) => {
  e.preventDefault();
  address.textContent = "Loading...";

  if (!input.value) {
    return (address.textContent = "Please provide an address");
  }

  fetch(`http://localhost:3000/weather?address=${input.value}`).then(
    (response) => {
      response.json().then((data) => {
        printWeather(data);
      });
    }
  );
});
