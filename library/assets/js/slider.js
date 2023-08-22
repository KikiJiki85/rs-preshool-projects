const fav = document.querySelector('.favorites');
const favFilter = document.querySelector('.fav-filter');
const favFilterEnd = document.querySelector('.coffee-shop');
const favControls = favFilter.querySelectorAll('.fav-filter-control');
const favTrack = favFilter.querySelector('.fav-filter-list');
const favSlides = favFilter.querySelectorAll('.fav-slide');
const favControlMenu = favFilter.querySelector('.fav-controls-wrapper');

let favSlideWidth = favTrack.clientWidth;
let favPosition = 0;

window.onscroll = function() {setSticky()};

const stickyStart = fav.offsetTop + favControlMenu.offsetTop;
const stickyEnd = favFilterEnd.offsetTop - favControlMenu.offsetTop;

function setSticky() {
    if (window.pageYOffset > stickyStart && window.pageYOffset < stickyEnd) {
        favControlMenu.classList.add('sticky');
    }
     else { 
        favControlMenu.classList.remove('sticky');
    }
}

favSlides.forEach((slide) => {
    slide.style.maxWidth = `${favSlideWidth}px`;
});

const favSetPosition = () => {
    favTrack.style.transform = `translateX(${favPosition}px)`;
 };

favControls.forEach((el,index) => {
    el.addEventListener('click', () => {
        favPosition = (-favSlideWidth) * index;
        setActiveFavSlide(index);
        
    });
});

const setActiveFavSlide = (index) => {
    favSlides.forEach((item) => item.classList.remove('fav-active-slide'));
    setTimeout(() => {
        favSlides[index].classList.add('fav-active-slide'); 
        favSetPosition();
    }, 400);
    favControls.forEach(el => el.disabled = false);
    favControls[index].disabled = true;
};