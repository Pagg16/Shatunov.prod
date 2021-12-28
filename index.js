let position = 0;
const slidersToScroll = 1;
const slidersToShow = 3;
const items = document.querySelectorAll(".div");
const track = document.querySelector(".slider");
const buttonRight = document.querySelector(".button-right");
const buttonLeft = document.querySelector(".button-left");
const sliderContainer = document.querySelector(".ing-block");
const itemsCount = items.length;
const itemWidth = track.clientWidth / itemsCount;
const movePosition = slidersToScroll * itemWidth;
const tracWidth = track.clientWidth;

items.forEach((item) => {
  item.style.minWidth = `${itemWidth}px`;
});

function right() {
  const itemsRight = itemsCount - Math.abs(position) / itemWidth;

  position +=
    itemsRight >= slidersToScroll ? movePosition : itemsRight * itemWidth;
  setPosition();
  checkBtn();
}

function left() {
  const itemsLeft =
    itemsCount - (Math.abs(position) + slidersToShow * itemWidth) / itemWidth;

  position -=
    itemsLeft >= slidersToScroll ? movePosition : itemsLeft * itemWidth;
  setPosition();
  checkBtn();
}

function setPosition() {
  track.style.transform = `translateX(${position}px)`;
}

function checkBtn() {
  // console.log(position);
  buttonRight.disabled = Math.trunc(position) === 0;
  buttonLeft.disabled = position <= -(itemsCount - slidersToShow) * itemWidth;
  centerItem();
}

function centerItem() {
  console.log(`position ${Math.abs(position)}`);
  console.log(Math.abs(Math.trunc(position)));
  const increase = Math.trunc((Math.abs(position) + itemWidth) / itemWidth);
  console.log(increase);
  // console.log(items[increase]);
}

checkBtn();
centerItem();

buttonRight.addEventListener("click", right);
buttonLeft.addEventListener("click", left);
