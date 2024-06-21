// Replace with your OpenWeatherMap API key
const apiKey = "76c2b3b986cb54818f37e2c9d67c65db";

const searchButton = document.querySelector(".search-button");
const searchBar = document.querySelector(".search-bar");
const locationElement = document.querySelector(".location");
const temperatureElement = document.querySelector(".temperature");
const weatherElement = document.querySelector(".weather");

const iconElement = document.querySelector(".weather-icon img"); // Updated selector for img

searchButton.addEventListener("click", () => {
  const searchTerm = searchBar.value.trim(); // Trim whitespace from input
  if (searchTerm) {
    getWeather(searchTerm);
  } else {
    alert("Please enter a city name.");
  }
});

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const weatherData = await response.json();

    locationElement.textContent = `${weatherData.name}, ${weatherData.sys.country}`;
    temperatureElement.textContent = `${Math.round(weatherData.main.temp)}°C`;
    weatherElement.textContent = weatherData.weather[0].main;

    // Set weather icon
    const iconCode = weatherData.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
    iconElement.setAttribute("src", iconUrl);
    iconElement.setAttribute("alt", weatherData.weather[0].description);
  } catch (error) {
    console.log("Error fetching weather data:", error);
    locationElement.textContent = "City not found";
    temperatureElement.textContent = "";
    weatherElement.textContent = "";
    iconElement.setAttribute("src", ""); // Clear icon if error occurs
  }
}
