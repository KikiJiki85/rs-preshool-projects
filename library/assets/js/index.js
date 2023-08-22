
const header = document.querySelector(".header");
const menuToggle = header.querySelector(".header-burger");
const menu = header.querySelector(".nav-list");
const menuLinks = header.querySelectorAll(".nav-link");

const headerProfile = header.querySelector('.header-profile');
const dropMenu = headerProfile.querySelector('.drop-menu');

const checkCard = document.querySelector('.form-search-btn');


menuToggle.addEventListener("click", function(evt) {
   evt._isClickWithInMenu = true;
   if (header.classList.contains("menu-toggle")) {
    header.classList.remove("menu-toggle");
   } else {
    header.classList.add("menu-toggle");
   }
});

for(let link of menuLinks) {
   link.addEventListener("click", () => {
      if (header.classList.contains("menu-toggle")) {
         header.classList.remove("menu-toggle");
        }
   });
}

menu.addEventListener("click", (evt) => {
   evt._isClickWithInMenu = true;
});

document.body.addEventListener('click', (evt) => {
   if (evt._isClickWithInMenu) return;
   header.classList.remove("menu-toggle");
});

//Profile drop menu
headerProfile.addEventListener('click', () => {
   dropMenu.classList.toggle('drop-toggle');
   dropMenu.addEventListener('transitionend', () => {
      
   });
});



// Find your Library card
checkCard.addEventListener('click', (evt) => {
   evt.preventDefault();
});

