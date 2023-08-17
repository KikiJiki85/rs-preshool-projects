const favFilter = document.querySelector('.fav-filter');
const favControls = favFilter.querySelectorAll('.fav-filter-control');
const favTrack = favFilter.querySelector('.fav-filter-list');
const favSlides = favFilter.querySelectorAll('.fav-slide');

let favSlideWidth = favTrack.clientWidth;
let favPosition = 0;

favSlides.forEach((slide) => {
    slide.style.maxWidth = `${favSlideWidth}px`;
});

const favSetPosition = () => {
    favTrack.style.transform = `translateX(${favPosition}px)`;
 };

favControls.forEach((el,index) => {
    el.addEventListener('click', () => {
        favPosition = (-favSlideWidth) * index;
        el.disabled = true;
        setTimeout(() => {
            favSetPosition();          
        }, 500);
        setActiveFavSlide(index);
        
    });
});

const setActiveFavSlide = (index) => {
    favSlides.forEach((item) => item.classList.remove('fav-active-slide'));
    setTimeout(() => {
        favSlides[index].classList.add('fav-active-slide'); 
    }, 500);
    
};