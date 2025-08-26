(async function () {
  // Получаем указатели на нужные элементы
  const formEl = document.querySelector("form");
  const weatherInfoEl = document.querySelector("#weatherInfo");

  function showWeather(el, weatherInfo) {
    const objectWeather = weatherInfo;
    const innerHTML = `Погода в городе ${objectWeather.name}:
состояние: ${objectWeather.weather[0].description},
температура: ${objectWeather.main.temp} &deg;С,
ощущается как: ${objectWeather.main.temp} &deg;С,
ветер: ${objectWeather.wind.speed} м/с`;
    el.innerHTML = innerHTML;
    //el.innerHTML = innerHTML + JSON.stringify(weatherInfo, null, 2);
  }

  /**
   * Функция должна делать запрос на
   * https://api.openweathermap.org/data/2.5/weather?units=metric&q={{CITY_NAME}}&appid={{APP_ID}}
   * где
   *  {{CITY_NAME}} должен быть заменен на имя города
   *  {{APP_ID}} должен быть заменен на ключ приложения
   * Запрос возвращает данные в формате JSON
   *
   * функция должна возвращать (Promise) данные с информацией о погоде
   * @param {string} cityName
   */
  async function getWeather(cityName) {
    const appId = '63b151efb40928e868a13e6198b120c9';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&units=metric&lang=ru&appid=${appId}`); 
    const responseJson = await response.json();
    return responseJson;
  }

  formEl.addEventListener("submit", async (ev) => {
    // чтобы не перезагружать страницу
    ev.preventDefault();

    // читаем значение из формы
    const formElement = ev.target;
    const inputEl = formElement.querySelector("input");
    const cityName = inputEl.value;
    inputEl.value = "";

    const weather = await getWeather(cityName);
    showWeather(weatherInfoEl, weather);
  });
})();
