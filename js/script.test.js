/*
 * @jest-environment jsdom
 */
const fs = require("fs");
const htmlData = fs.readFileSync("./dist/index.html");
document.body.innerHTML = htmlData;

const { weather } = require("./script.js");

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
