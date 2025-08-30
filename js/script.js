function showWeather(el, objectWeather) {
  el.querySelector("#cityName").innerHTML = objectWeather.name;

  el.querySelector("#currentDateTime").innerHTML = Date()
    .split(" ")
    .filter((el, ind) => ind < 4)
    .join(" ");

  el.querySelector(".weather-icon").innerHTML =
    `<img src="https://openweathermap.org/img/wn/${objectWeather.weather[0].icon}@2x.png" alt="${objectWeather.weather[0].description}" />`;

  el.querySelector(".temperature").innerHTML =
    `${objectWeather.main.temp} &deg;С`;

  el.querySelector(".weather-description").innerHTML =
    objectWeather.weather[0].description;

  el.querySelectorAll(
    ".weather-detail",
  )[0].lastElementChild.lastElementChild.innerHTML =
    `${objectWeather.wind.speed} м/с`;

  el.querySelectorAll(
    ".weather-detail",
  )[1].lastElementChild.lastElementChild.innerHTML =
    `${objectWeather.main.humidity}%`;

  el.querySelectorAll(
    ".weather-detail",
  )[2].lastElementChild.lastElementChild.innerHTML =
    `${objectWeather.main.pressure} гПа`;

  el.querySelector("#lastUpdated").innerHTML = `последнее обновление: ${Date(
    objectWeather.dt,
  )
    .split(" ")
    .filter((el, ind) => ind < 4)
    .join(" ")}`;
}

async function getWeather(cityName) {
  const appId = "63b151efb40928e868a13e6198b120c9";
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&units=metric&lang=ru&appid=${appId}`,
  );
  if (response.ok) {
    const responseJson = await response.json();
    return responseJson;
  } else return null;
}

async function getCity() {
  const response = await fetch(`https://get.geojs.io/v1/ip/geo.json`);
  if (response.ok) {
    const responseJson = await response.json();
    return responseJson.city ? responseJson.city : responseJson.country;
  }
  return null;
}

function getInputData(formElement) {
  const inputEl = formElement.querySelector("input");
  const cityName = inputEl.value;
  inputEl.value = "";
  return cityName;
}

function addToHistory(objectWeather) {
  let cityHistory = [];
  let idHistory = [];
  if (localStorage.getItem("cityHistory")) {
    idHistory = JSON.parse(localStorage.getItem("idHistory"));
    cityHistory = JSON.parse(localStorage.getItem("cityHistory"));
  }
  const cityIndex = idHistory.indexOf(objectWeather.id);
  if (cityIndex >= 0) {
    cityHistory.splice(cityIndex, 1);
    idHistory.splice(cityIndex, 1);
  }

  cityHistory.unshift(objectWeather.name);
  idHistory.unshift(objectWeather.id);

  if (cityHistory.length >= 10) {
    cityHistory.pop();
    idHistory.pop();
  }
  localStorage.setItem("cityHistory", JSON.stringify(cityHistory));
  localStorage.setItem("idHistory", JSON.stringify(idHistory));
}

async function drawItem(historyItem, cityName) {
  const weather = await getWeather(cityName);
  if (await weather) {
    historyItem.innerHTML = `
      <div class="history-item-city">
        <div class="city-icon">
          <i class="fas fa-map-marker-alt"></i>
        </div>
        <div class="city-info">
          <h3>${weather.name}, ${weather.sys.country}</h3>
          <p>${Date(weather.dt)
            .split(" ")
            .filter((el, ind) => ind < 4)
            .join(" ")}</p>
        </div>
      </div>
      <div class="history-item-weather">
        <p>${weather.main.temp}&deg;С</p>
        <p>${weather.weather[0].description}</p>
      </div>
    `;
  }
}

async function drawHistory(listEl) {
  const cities = JSON.parse(localStorage.getItem("cityHistory"));
  listEl.innerHTML = "";
  for (let i = 0; i < cities.length; i++) {
    let listItem = document.createElement("div");
    listItem.classList.add("history-item");
    await drawItem(listItem, cities[i]);

    listItem.addEventListener("click", async (ev) => {
      const cityName = ev.target.querySelector("h3").innerHTML.split(" ")[0];
      const weather = await getWeather(cityName);

      if (await weather) {
        showWeather(document.querySelector("#weatherData"), weather);
        changeMap(weather);
        addToHistory(weather);
        drawHistory(document.querySelector(".history-list"));
      }
    });
    listEl.append(listItem);
  }
}

/*async function changeMap(objectWeather) {
  await ymaps3.ready;

  const { YMap, YMapDefaultSchemeLayer } = ymaps3;

  if (document.getElementById("map").firstElementChild)
    document.getElementById("map").firstElementChild.remove();

  const map = new YMap(document.getElementById("map"), {
    location: {
      center: [objectWeather.coord.lon, objectWeather.coord.lat],
      zoom: 10,
    },
  });

  map.addChild(new YMapDefaultSchemeLayer());
}*/

async function weather() {
  const x = await fetch(
    "https://api-maps.yandex.ru/v3/?apikey=6f130378-8e07-4626-a413-392271cdb214&lang=ru_RU"
  );
  console.log(x);

  // Получаем указатели на нужные элементы
  const formEl = document.querySelector("#cityForm");
  const weatherInfoEl = document.querySelector("#weatherData");
  const historyList = document.querySelector(".history-list");
  drawHistory(historyList);

  let defaultCity = await getCity();
  if (!defaultCity) defaultCity = "minsk";
  let defaultWeather = await getWeather(defaultCity);
  showWeather(weatherInfoEl, defaultWeather);
  //changeMap(defaultWeather);

  formEl.addEventListener("submit", async (ev) => {
    // чтобы не перезагружать страницу
    ev.preventDefault();

    // читаем значение из формы
    const cityName = getInputData(ev.target);

    const weather = await getWeather(cityName);

    if (await weather) {
      showWeather(weatherInfoEl, weather);
      //changeMap(weather);
      addToHistory(weather);
      drawHistory(historyList);
    }
  });
}

weather();

// module.exports = {
//   weather,
//   getWeather,
//   formWeatherText,
// };
