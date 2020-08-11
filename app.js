//SElECT ELEMENTS
const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
// const submitInput = document.querySelector("#submit");
// const inputField = document.querySelector("#input");

// submitInput.addEventListener("click", () => {
//   const api_key = "c1fcb01c01c8ca62541a0f4b2b79d385";
//   let api_city = `http://api.openweathermap.org/data/2.5/weather?q=${inputField.input}&appid=${api_key}`;
//   fetch(api_city).then((response) => {
//     console.log(response);
//   });
// });

//APP DATA
const weather = {};
weather.temperature = {
  unit: "c",
};

//CHECK IF THE USERS BROWSERS SUPPORTS GEOLOCATION
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(setPostion, showError);
} else {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p>Browser doesn't support geolocation</p>`;
}

function setPostion(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

function showError(error) {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p>${error.message}</p>`;
}

//GET WEATHER FROM API
function getWeather(lat, lon) {
  const api_key = "c1fcb01c01c8ca62541a0f4b2b79d385";
  let api_coords = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;

  fetch(api_coords)
    .then((response) => {
      let data = response.json();
      console.log(data);
      return data;
    })
    .then(function (data) {
      weather.temperature.value = Math.floor(data.main.temp - 273);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(function () {
      displayWeather();
    });
}
//DISPLAYING UI
function displayWeather() {
  iconElement.innerHTML = `<img src="./icons/${weather.iconId}.png" />`;
  tempElement.innerHTML = `<p>${weather.temperature.value}°<span>C</span></p>`;
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city} , ${weather.country}`;
}

//TEMP ELEMENT HANDLER
tempElement.addEventListener("click", handleTempToggle);
function handleTempToggle() {
  if (weather.temperature.value === undefined) return;
  if (weather.temperature.unit === "c") {
    let ferenheit = celciusToFerenheit(weather.temperature.value);
    tempElement.innerHTML = `<p>${ferenheit}°<span>F</span></p>`;
    weather.temperature.unit = "f";
  } else {
    tempElement.innerHTML = `<p>${weather.temperature.value}°<span>C</span></p>`;
    weather.temperature.unit = "c";
  }
}
function celciusToFerenheit(temperature) {
  return Math.floor((temperature * 9) / 5);
}
