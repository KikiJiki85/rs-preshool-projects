let position = 0;
let slidesToShow = 3;
let sliderCount = 0;
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

sliderControls.forEach((el,index) => {
   el.addEventListener('click', () => {
      position = -itemWidth * index;
      setPosition();

      sliderCount = index;
      setActiveButton(sliderCount);
   });
});

const setPosition = () => {
   track.style.transform = `translateX(${position}px)`;
};

const setActiveButton = (index) => {
   sliderControls.forEach((item) => item.classList.remove('active-slide'));
   sliderControls[index].classList.add('active-slide');
   switch(index) {
      case 0: 
         tabletPrev.disabled = true;
         tabletNext.disabled = false;
         break;
      case (items.length - 1):
         tabletPrev.disabled = false;
         tabletNext.disabled = true;
         break;
      default:
         tabletPrev.disabled = false;
         tabletNext.disabled = false;
   }
};

tabletPrev.addEventListener('click', () => {
   const itemsLeft = Math.abs(position) / itemWidth;

   position += itemsLeft >= slidesToScroll ?  movePosition : itemsLeft * itemWidth;
   setPosition();
   
   sliderCount--;
   if (sliderCount < 0) sliderCount = 0;
   setActiveButton(sliderCount);
});

tabletNext.addEventListener('click', () => {
   const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;

   position -= itemsLeft >= slidesToScroll ?  movePosition : itemsLeft * itemWidth;
   setPosition();

   sliderCount++;
   if (sliderCount >= items.length) sliderCount = items.length - 1;
   setActiveButton(sliderCount);
});

