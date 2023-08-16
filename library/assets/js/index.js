const menuToggle = document.querySelector(".header-burger");
const menuPopup = document.querySelector(".header");
const menu = document.querySelector(".nav-list");
const menuLinks = document.querySelectorAll(".nav-link");


menuToggle.addEventListener("click", function(evt) {
   evt._isClickWithInMenu = true;
   if (menuPopup.classList.contains("menu-toggle")) {
    menuPopup.classList.remove("menu-toggle");
   } else {
    menuPopup.classList.add("menu-toggle");
   }
});

for(let link of menuLinks) {
   link.addEventListener("click", () => {
      if (menuPopup.classList.contains("menu-toggle")) {
         menuPopup.classList.remove("menu-toggle");
        }
   });
}

menu.addEventListener("click", (evt) => {
   evt._isClickWithInMenu = true;
});

document.body.addEventListener('click', (evt) => {
   if (evt._isClickWithInMenu) return;
   menuPopup.classList.remove("menu-toggle");
});

console.log(``);


let position = 0;
const slidesToShow = 3;
const slidesToScroll = 1;

const slider = document.querySelector('.slider');

const container = slider.querySelector('.slider-wrapper');
const track = slider.querySelector('.slider-list');
const items = slider.querySelectorAll('.slider-item');
const sliderControls = slider.querySelectorAll('.slider-control');

const itemsCount = items.length;
const itemWidth = container.clientWidth / slidesToShow;
const movePosition = slidesToScroll * itemWidth;

items.forEach((item) => {
   item.style.minWidth = `${itemWidth}px`;
})

sliderControls[1].addEventListener('click', () => {
   const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;

   position -= itemsLeft >= slidesToScroll ?  movePosition : itemsLeft * itemWidth;

   setPosition();
});

sliderControls[0].addEventListener('click', () => {
   const itemsLeft = Math.abs(position) / itemWidth;

   position += itemsLeft >= slidesToScroll ?  movePosition : itemsLeft * itemWidth;

   setPosition();
});

const setPosition = () => {
   track.style.transform = `translateX(${position}px)`;
};

const checkBtns = () => {
};



