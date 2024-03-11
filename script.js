const apiKey = "431f3787bc2e138545953e14fca7942d";
const apiURL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiURL + city + `&appid=${apiKey}`);

  if (response.status !== 200) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather-data").style.display = "none";
    document.querySelector(".other-data").style.display = "none";
    searchBox.value = "";
  } else {
    let data = await response.json();

    document.querySelector(".city-data h2 span").innerHTML = data.name;
    document.querySelector(".city-data h1").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".about-data .humidity").innerHTML =
      data.main.humidity + " %";
    document.querySelector(".about-data .wind").innerHTML = data.wind.speed;
    document.querySelector(".about-data .pressure").innerHTML =
      data.main.pressure;
    document.querySelector(".about-data .gust").innerHTML = data.wind.gust;

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "./assets/cloudy.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "./assets/clear.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "./assets/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "./assets/mist.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "./assets/rain.png";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "./assets/snow.png";
    }

    document.querySelector(".weather-data").style.display = "flex";
    document.querySelector(".other-data").style.display = "flex";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", function () {
  checkWeather(searchBox.value);
});
