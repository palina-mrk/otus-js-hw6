const { setBGC, getBGC } = require("./functions.js");

const initialBGC = getBGC(document.body);
const inputToRead = document.getElementById("change-bgc__new");
const buttonToReset = document.getElementById("change-bgc__init");

inputToRead.oninput = () => {
  setBGC(document.body, event.target.value);
};

buttonToReset.onclick = () => {
  setBGC(document.body, initialBGC);
};
