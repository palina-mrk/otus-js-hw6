/*
 * @jest-environment jsdom
 */
const fs = require("fs");
const htmlData = fs.readFileSync("index.html");
document.body.innerHTML = htmlData;
fetch = jest.fn((someData) =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        data: someData,
        timezone: "BY/minsk",

        name: "Минск",
        weather: [{ description: "ясно" }],
        main: {
          temp: 30,
          feels_like: 28,
        },
        wind: { speed: 18 },
      }),
    ok: true,
    status: 200,
  }),
);

describe("weather", () => {
  const { weather } = require("./script.js");

  it("is a function", () => {
    expect(weather).toBeInstanceOf(Function);
  });
  // it("correctly returns background color of the element", () => {
  //   const newContainer = document.createElement("div");
  //   newContainer.style.backgroundColor = "green";
  //   document.body.append(newContainer);

  //   expect(getBGC(newContainer)).toBe("green");

  //   newContainer.remove();
  // });
});

describe("getWeather", () => {
  const { getWeather } = require("./script.js");
  it("is a function", () => {
    expect(getWeather).toBeInstanceOf(Function);
  });

  it("returns an object", () => {
    expect(getWeather("minsk")).toBeInstanceOf(Object);
  });
  it("imports the city name into address string", async () => {
    let obj = await getWeather("minsk");
    expect(obj.data.indexOf("minsk") > 0).toBe(true);
  });
});

describe("formWeatherText", () => {
  const { formWeatherText } = require("./script.js");

  it("is a function", () => {
    expect(formWeatherText).toBeInstanceOf(Function);
  });
  it("correctly maps the given weather object to text", () => {
    const minskWeather = {
      name: "Минск",
      weather: [{ description: "ясно" }],
      main: {
        temp: 30,
        feels_like: 28,
      },
      wind: { speed: 18 },
    };
    const newText = formWeatherText(minskWeather);
    expect(newText.indexOf("Минск") >= 0).toBe(true);
    expect(newText.indexOf("ясно") >= 0).toBe(true);
    expect(newText.indexOf("температура: 30") >= 0).toBe(true);
    expect(newText.indexOf("ощущается как: 28") >= 0).toBe(true);
    expect(newText.indexOf("ветер: 18 м/с") >= 0).toBe(true);
  });
});
