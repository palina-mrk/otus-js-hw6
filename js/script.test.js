/*
 * @jest-environment jsdom
 */
const fs = require("fs");
const htmlData = fs.readFileSync("./index.html");
document.body.innerHTML = htmlData;

const { setBGC, getBGC } = require("./script.js");

describe("getBGC(elem) returns background color of the element", () => {
  it("is a function", () => {
    expect(getBGC).toBeInstanceOf(Function);
  });
  it("correctly returns background color of the element", () => {
    const newContainer = document.createElement("div");
    newContainer.style.backgroundColor = "green";
    document.body.append(newContainer);

    expect(getBGC(newContainer)).toBe("green");

    newContainer.remove();
  });
});

describe("setBGC(elem, color) appends new background color of the element", () => {
  it("is a function", () => {
    expect(setBGC).toBeInstanceOf(Function);
  });
  it("correctly returns background color of the element", () => {
    const newContainer = document.createElement("div");
    newContainer.style.backgroundColor = "green";
    document.body.append(newContainer);

    setBGC(newContainer, "red");
    expect(newContainer.style.backgroundColor).toBe("red");

    newContainer.remove();
  });
});
