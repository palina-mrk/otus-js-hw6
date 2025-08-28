/*
 * @jest-environment jsdom
 */
const fs = require("fs");
const htmlData = fs.readFileSync("index.html");
document.body.innerHTML = htmlData;

const { weather, showWeather, getWeather } = require("./script.js");

describe("weather", () => {
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
  it("is a function", () => {
    expect(getWeather).toBeInstanceOf(Function);
  });

  fetch = jest.fn((someData) =>
    Promise.resolve({
      json: () => Promise.resolve({ data: someData }),
      ok: true,
      status: 200,
    }),
  );

  it("returns an object", () => {
    expect(getWeather("minsk")).toBeInstanceOf(Object);
  });
  it("imports the city name into address string", async () => {
    let obj = await getWeather("minsk");
    expect(obj.data.indexOf("minsk") > 0).toBe(true);
  });
});

describe("showWeather", () => {
  it("is a function", () => {
    expect(showWeather).toBeInstanceOf(Function);
  });
  it("correctly shows the given weather object", () => {
    const minskWeather = {
      name: "Минск",
      weather: [{ description: "ясно" }],
      main: {
        temp: 30,
        feels_like: 28,
      },
      wind: { speed: 18 },
    };
    const newContainer = document.createElement("div");

    showWeather(newContainer, minskWeather);
    document.body.append(newContainer);
    expect(newContainer.innerHTML.indexOf("Минск") >= 0).toBe(true);
    expect(newContainer.innerHTML.indexOf("ясно") >= 0).toBe(true);
    expect(newContainer.innerHTML.indexOf("температура: 30") >= 0).toBe(true);
    expect(newContainer.innerHTML.indexOf("ощущается как: 28") >= 0).toBe(true);
    expect(newContainer.innerHTML.indexOf("ветер: 18 м/с") >= 0).toBe(true);
    newContainer.remove();
  });
});
