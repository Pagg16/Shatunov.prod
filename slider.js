const videoLink = [
  "https://www.youtube.com/watch?v=_G9e1CIZFBs",
  "https://www.youtube.com/watch?v=urWoJOnb7Ys",
  "https://www.youtube.com/watch?v=yGoTr4kMxH4",
  "https://www.youtube.com/watch?v=_G9e1CIZFBs",
  "https://www.youtube.com/watch?v=956a4eO5iGY",
  "https://www.youtube.com/watch?v=gsllGgYK6qs",
  "https://www.youtube.com/watch?v=yGoTr4kMxH4",
  "https://www.youtube.com/watch?v=urWoJOnb7Ys",
  "https://www.youtube.com/watch?v=yGoTr4kMxH4",
  "https://www.youtube.com/watch?v=_G9e1CIZFBs",
  "https://www.youtube.com/watch?v=urWoJOnb7Ys",
  "https://www.youtube.com/watch?v=yGoTr4kMxH4",
  "",
  "",
  "",
];

const sliderItems = [];

const videoQuality = ["maxresdefault", "sddefault", "hqdefault", "mqdefault"];

const videoBlock = document.querySelector(".video-block");

const sliderElement = document
  .getElementById("slider-construction")
  .content.querySelector(".slider-element")
  .cloneNode(true);

const slider = sliderElement.querySelector(".slider");

const buttonRight = sliderElement.querySelector(
  ".slider-element__button-right"
);

const buttonLeft = sliderElement.querySelector(".slider-element__button-left");

videoLink.forEach((elem) => {
  coversCheck(parseMediaURL(elem));
});

function parseMediaURL(elem) {
  return elem.replace("https://www.youtube.com/watch?v=", "");
}

function coversCheck(id) {
  const imagesSize = [];
  for (let i = 0; i < videoQuality.length + 1; i++) {
    let img = document.createElement("img");
    img.src = `https://i1.ytimg.com/vi/${id}/${videoQuality[i]}.jpg`;

    img.onload = function () {
      if (videoQuality.length === i && imagesSize.length > 0) {
        arrСomparison(imagesSize);
      } else if (img.width > 120) {
        imagesSize.unshift({ img: img, id: id });
      } else if (videoQuality.length === i && imagesSize.length === 0) {
        appendSlider("none");
        // appendSlider(createErrorElement());
      }
    };

    //   img.onerror = function () {
    //     console.log("ничего нет по ссылке");
    //     appendSlider(createErrorElement());
    //   };
  }
}

function arrСomparison(imagesSize) {
  const sortedArr = imagesSize.sort((a, b) => a.img.width - b.img.width);
  rightSize(
    sortedArr[sortedArr.length - 1].img,
    sortedArr[sortedArr.length - 1].img.width,
    sortedArr[sortedArr.length - 1].img.height,
    sortedArr[sortedArr.length - 1].id
  );
}

function rightSize(elem, elemWidth, elemHeigth, id) {
  if (elemWidth / elemHeigth === 16 / 9) {
    elem.classList.add("image-normal");
    appendSlider(elem, id);
  } else {
    elem.classList.add("image-pruning");
    appendSlider(elem, id);
  }
}

function appendSlider(elem, id) {
  if (elem != "none") {
    const imageDiv = document.createElement("div");
    imageDiv.classList.add("image-block");
    imageDiv.innerHTML = ` <div class="youTube-icon">
    <svg viewBox="0 0 68 48">
        <path class="video__button-shape"
            d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z">
        </path>
        <path class="video__button-icon" d="M 45,24 27,14 27,34"></path>
    </svg>
</div>`;
    imageDiv.append(elem);
    slider.append(imageDiv);
    sliderItems.push({ imageDiv, id });
    createSliderVideo();
  } else {
    sliderItems.push(elem);
    createSliderVideo();
  }
}

// function createErrorElement() {
//   const errorBlock = document.createElement("div");
//   errorBlock.classList.add("error-block");
//   errorBlock.innerHTML = `<p class="error-block__text">Видео не загрузилось или не существует</p>`;

//   return errorBlock;
// }

function createSliderVideo() {
  if (videoLink.length === sliderItems.length) {
    let focusItem = 0;
    let itemWidth = 0;
    let itemHeight = 0;
    const noEmpty = sliderItems.filter((elem) => elem != "none");
    const itemsCount = noEmpty.length;
    let resizeTimeout = false;
    let displacementAmount = 0;
    let position = 0;

    window.addEventListener("resize", () => {
      if (!resizeTimeout) {
        resizeTimeout = true;
        setTimeout(() => {
          adjustmentSize();
          position = 0;
          slider.style.transform = `translateX(${0}px)`;
          noEmpty[focusItem].imageDiv.classList.remove("focus-image");
          noEmpty[1].imageDiv.classList.add("focus-image");
          buttonLeft.disabled = false;
          buttonRight.disabled = false;
          resizeTimeout = false;
        }, 500);
      }
    });

    function adjustmentSize() {
      itemWidth = elemWidth();
      console.log(itemWidth);
      itemHeight = itemWidth / (16 / 9);
      sliderElement.style.width = sliderWidth();
      sliderElement.style.height = sliderHeight();

      console.log(itemWidth * 3);

      directionDisplacement();

      resizingItem();
    }

    adjustmentSize();

    function directionDisplacement() {
      if (document.documentElement.clientWidth <= 800) {
        displacementAmount = Math.round(itemHeight);
      } else {
        displacementAmount = Math.round(itemWidth);
      }
    }

    function elemWidth() {
      if (document.documentElement.clientWidth <= 800) {
        return (document.documentElement.clientWidth / 100) * 65;
      } else {
        return (document.documentElement.clientWidth / 100) * 25;
      }
    }

    function sliderHeight() {
      if (document.documentElement.clientWidth <= 800) {
        return `${itemWidth * 1.4}px`;
      } else {
        return `${itemHeight * 1.6}px`;
      }
    }

    function sliderWidth() {
      if (document.documentElement.clientWidth <= 800) {
        if (noEmpty.length > 2) {
          return `${itemHeight * 3}px`;
        } else {
          return `${itemHeight * noEmpty.length}px`;
        }
      } else {
        if (noEmpty.length > 2) {
          console.log(itemWidth * 3);
          return `${itemWidth * 3}px`;
        } else {
          return `${itemWidth * noEmpty.length}px`;
        }
      }
    }

    noEmpty.forEach((item) => {
      setupVideo(item.imageDiv, item.id);
    });

    function resizingItem() {
      noEmpty.forEach((item) => {
        item.imageDiv.style.minWidth = `${itemWidth}px`;
        item.imageDiv.style.height = `${itemHeight}px`;
      });
    }

    if (noEmpty.length > 2) {
      function right() {
        position = position + displacementAmount;
        console.log(position);
        setPosition();
        checkBtn();
      }

      function left() {
        position = position - displacementAmount;
        setPosition();
        checkBtn();
      }

      function setPosition() {
        slider.style.transform = `translateX(${position}px)`;
      }

      function checkBtn() {
        buttonLeft.disabled = position === displacementAmount;
        buttonRight.disabled =
          position ===
          -displacementAmount * itemsCount + displacementAmount * 2;
        centerItem();
      }

      function centerItem() {
        if (position === displacementAmount) {
          focusItem = 0;
        } else {
          focusItem = Math.abs(position) / displacementAmount + 1;
        }

        console.log("position" + " " + position);
        console.log(focusItem);

        noEmpty[focusItem].imageDiv.classList.add("focus-image");

        if (
          focusItem >= 1 &&
          noEmpty[focusItem - 1].imageDiv.classList.contains("focus-image")
        ) {
          noEmpty[focusItem - 1].imageDiv.classList.remove("focus-image");
        } else {
          noEmpty[focusItem + 1].imageDiv.classList.remove("focus-image");
        }
      }

      buttonLeft.addEventListener("click", right);
      buttonRight.addEventListener("click", left);

      checkBtn();
      setPosition();
    } else {
      buttonRight.remove();
      buttonLeft.remove();
    }

    function setupVideo(item, id) {
      function ClickVideo() {
        item.style.background =
          "url(./images/loading.gif) center center / cover no-repeat";

        const iframe = createIframe(id);

        iframe.onload = () => {
          item.style.background = "none";
        };

        item.querySelector("img").remove();
        item.querySelector("div").remove();

        item.appendChild(iframe);

        item.removeEventListener("click", ClickVideo);
      }

      item.addEventListener("click", ClickVideo);
    }

    function createIframe(id) {
      let iframe = document.createElement("iframe");

      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute("allow", "autoplay");
      iframe.setAttribute("src", generateURL(id));
      iframe.classList.add("video-media");

      return iframe;
    }

    function generateURL(id) {
      let query = "?rel=0&showinfo=0&autoplay=1";

      return "https://www.youtube.com/embed/" + id + query;
    }

    videoBlock.append(sliderElement);
  }
}
