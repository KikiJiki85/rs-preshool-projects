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

console.log(`
1. Вёрстка соответствует макету. Ширина экрана 768px +26\n
2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12\n
3. На ширине экрана 768рх реализовано адаптивное меню +12\n
Итого: 50 баллов`);