const API_KEY = "0e862d2349ac4591bb1134707252201";
//let city = "Sumy";

const WeatherStation = {
  temperature: null,
  humidity: null,
  pressure: null,
  condition: null,
  history: [],

  async fetchWeatherData(city, isInitialLoad = false) {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
      );
      if (!response.ok) throw new Error("Failed to fetch weather data.");

      const data = await response.json();
      const { temp_c, humidity, pressure_mb, condition } = data.current;

      this.updateWeatherData(temp_c, humidity, pressure_mb, condition.text);
      this.updateTables(isInitialLoad); 
      this.displayWeatherForecast(condition.text);
      this.saveToLocalStorage();
    } catch (error) {
      console.error(error);
      alert("Unable to fetch weather data.");
    }
  },

  updateWeatherData(temp, humidity, pressure, condition) {
    this.temperature = temp;
    this.humidity = humidity;
    this.pressure = pressure;
    this.condition = condition;
  },

  displayWeatherForecast(condition) {
    const forecastText = document.getElementById("forecastText");
    const forecastImage = document.getElementById("forecastImage");

    forecastText.style.opacity = "0";
    forecastImage.style.opacity = "0";

    setTimeout(() => {
      forecastText.textContent = `Current weather: ${condition}`;
      forecastText.style.opacity = "1";

      let iconSrc;
      if (condition.toLowerCase().includes("sun")) {
        iconSrc = "img/sun.gif";
      } else if (condition.toLowerCase().includes("cloud")) {
        iconSrc = "img/cloud.gif";
      } else if (condition.toLowerCase().includes("rain")) {
        iconSrc = "img/rain.gif";
      } else if (condition.toLowerCase().includes("fog")) {
        iconSrc = "img/fog.gif";
      } else if (condition.toLowerCase().includes("overcast")) {
        iconSrc = "img/overcast.gif";
      } else if(condition.toLowerCase().includes("snow")) {
        iconSrc = "img/snow.gif";
      } else {
        iconSrc = "img/forecast.gif";
      }

      forecastImage.src = iconSrc;
      forecastImage.alt = condition;
      forecastImage.style.opacity = "1";
    }, 300);
  },

  updateTables(isInitialLoad) {
    const tempTable = document.getElementById("tempTable").querySelector("tbody");
    const humidityTable = document.getElementById("humidityTable").querySelector("tbody");
    const pressureTable = document.getElementById("pressureTable").querySelector("tbody");

    const time = new Date().toLocaleTimeString();
    const tempRow = `<tr><td>${time}</td><td>${city}</td><td>${this.temperature}°C</td></tr>`;
    const humidityRow = `<tr><td>${time}</td><td>${city}</td><td>${this.humidity}%</td></tr>`;
    const pressureRow = `<tr><td>${time}</td><td>${city}</td><td>${this.pressure} hPa</td></tr>`;

    this.addRowToTable(tempTable, tempRow);
    this.addRowToTable(humidityTable, humidityRow);
    this.addRowToTable(pressureTable, pressureRow);

    
    if (!isInitialLoad) {
      this.addToHistory(time);
    }
  },

  addRowToTable(table, row) {
    const rows = table.rows;
    if (rows.length >= 5) {
      table.deleteRow(0);
    }
    table.innerHTML += row;
  },

  addToHistory(time) {
    if (this.history.length >= 30) {
      this.history.shift();
    }
    this.history.push({ time, city, temp: this.temperature, humidity: this.humidity, pressure: this.pressure });
    this.updateHistoryTable();
    this.saveToLocalStorage();
  },

  updateHistoryTable() {
    const historyTable = document.getElementById("historyTable").querySelector("tbody");
    historyTable.innerHTML = this.history
      .map(({ time, city, temp, humidity, pressure }) => `<tr><td>${time}</td><td>${city}</td><td>${temp}°C</td><td>${humidity}%</td><td>${pressure} hPa</td></tr>`)
      .join("");
  },

  saveToLocalStorage() {
    const data = {
      temperature: this.temperature,
      humidity: this.humidity,
      pressure: this.pressure,
      condition: this.condition,
      history: this.history,
      city: city,
    };
    localStorage.setItem("weatherData", JSON.stringify(data));
  },

  loadFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem("weatherData"));
    if (data) {
      this.temperature = data.temperature;
      this.humidity = data.humidity;
      this.pressure = data.pressure;
      this.condition = data.condition;
      this.history = data.history;
      city = data.city;

      this.updateTables(true);
      this.displayWeatherForecast(this.condition);
      this.updateHistoryTable();
    }
  },
};

document.getElementById("fetchWeather").addEventListener("click", () => {
  const inputCity = document.getElementById("cityInput").value.trim();
  if (inputCity) {
    city = inputCity;
    WeatherStation.fetchWeatherData(city);
  }
});

document.getElementById("showHistory").addEventListener("click", () => {
  const historySection = document.getElementById("historySection");
  historySection.classList.toggle("hidden");
});

document.getElementById("clearHistory").addEventListener("click", () => {
  WeatherStation.history = []; 
  WeatherStation.updateHistoryTable();
  localStorage.removeItem("weatherData");
  const historySection = document.getElementById("historySection");
  historySection.classList.toggle("hidden");
  alert("History cleared!");
});

WeatherStation.loadFromLocalStorage();
WeatherStation.fetchWeatherData(city, true);

setInterval(() => WeatherStation.fetchWeatherData(city), 30000);
