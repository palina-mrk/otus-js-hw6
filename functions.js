function setBGC(elem, value) {
  elem.style.backgroundColor = value;
}

function getBGC(elem) {
  return elem.style.backgroundColor;
}

module.exports = {
  setBGC,
  getBGC,
};
