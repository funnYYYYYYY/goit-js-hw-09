function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  body: document.querySelector('body'),
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};
console.log(refs.body);
let colorChange = null;

refs.btnStart.addEventListener('click', onRandomColorChangeTriggered);
refs.btnStop.addEventListener('click', onStopRandomColorChangeTriggered);

function onRandomColorChangeTriggered() {
  colorChange = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.btnStart.setAttribute('disabled', false);
  refs.btnStop.removeAttribute('disabled', false);
}

function onStopRandomColorChangeTriggered() {
  clearInterval(colorChange);
  refs.btnStart.removeAttribute('disabled', false);
  refs.btnStop.setAttribute('disabled', false);
}
