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
