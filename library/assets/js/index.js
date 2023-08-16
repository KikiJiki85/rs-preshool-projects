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
let slidesToShow = 3;
let activeButton = 0;
const slidesToScroll = 1;

const slider = document.querySelector('.slider');
const mediaQuery = window.matchMedia('(max-width: 1024px)');
if(mediaQuery.matches) {
   slidesToShow = 1;
}

const container = slider.querySelector('.slider-wrapper');
const track = slider.querySelector('.slider-list');
const items = slider.querySelectorAll('.slider-item');
const sliderControls = slider.querySelectorAll('.slider-control');
const tabletPrev = slider.querySelector('.slider-control-tablet1');
const tabletNext = slider.querySelector('.slider-control-tablet2');

const itemsCount = items.length;
const itemWidth = container.clientWidth / slidesToShow;
const movePosition = slidesToScroll * itemWidth;

items.forEach((item) => {
   item.style.minWidth = `${itemWidth}px`;
})

sliderControls.forEach((el,i) => {
   el.addEventListener('click', (evt) => {
      position = -itemWidth * i;
      setPosition();
      setActiveButton(evt,el);
   });
});

const setPosition = () => {
   track.style.transform = `translateX(${position}px)`;
};

const setActiveButton = (evt,el) => {
   if (el.classList.contains('active-slide')) {
      el.classList.remove('active-slide')
   } else {
      evt.target.classList.add('active-slide');
   }
};



tabletPrev.addEventListener('click', () => {
   const itemsLeft = Math.abs(position) / itemWidth;

   position += itemsLeft >= slidesToScroll ?  movePosition : itemsLeft * itemWidth;
   setPosition();
});

tabletNext.addEventListener('click', () => {
   const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;

   position -= itemsLeft >= slidesToScroll ?  movePosition : itemsLeft * itemWidth;
   setPosition();
});


