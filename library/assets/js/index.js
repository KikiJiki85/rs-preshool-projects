
const header = document.querySelector(".header");
const menuToggle = header.querySelector(".header-burger");
const menu = header.querySelector(".nav-list");
const menuLinks = header.querySelectorAll(".nav-link");

const profileButton = header.querySelector(".profile-button");
const dropMenu = header.querySelector(".drop-menu");
const dropMenuAuth = header.querySelector(".drop-menu-auth");
const register = header.querySelector(".drop-menu__register");
const modalReg = document.querySelector(".modal-register");
const modalRegContainer = modalReg.querySelector(".modal-register__wrapper");
const modalRegClose = modalReg.querySelector(".modal-register__close");
const getCardReg = document.querySelector(".library-card-get__register");

const registerForm = modalReg.querySelector(".modal-register__form");
const regFirstName = modalReg.querySelector("#register-first-name");
const regLastName = modalReg.querySelector("#register-last-name");
const regEmail = modalReg.querySelector("#register-email");
const regPassword = modalReg.querySelector("#register-password");
let isStorageSupport = true;
let newUser = {};
const userProfile = header.querySelector(".profile-user");

const checkCard = document.querySelector(".form-search-btn");

function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max - min)) + min;
}

menuToggle.addEventListener("click", function(evt) {
   evt._isClickWithInMenu = true;
   if (header.classList.contains("menu-toggle")) {
    header.classList.remove("menu-toggle");
   } else {
    dropMenu.classList.remove("drop-toggle");
    dropMenuAuth.classList.remove("drop-toggle");
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

const isClickWidthInMenuHandler = (evt) => {
   evt._isClickWithInMenu = true;
};

menu.addEventListener("click", isClickWidthInMenuHandler);
dropMenu.addEventListener("click", isClickWidthInMenuHandler);
dropMenuAuth.addEventListener("click", isClickWidthInMenuHandler);
modalRegContainer.addEventListener("click", isClickWidthInMenuHandler);


document.body.addEventListener("click", (evt) => {
   if (evt._isClickWithInMenu) return;
   header.classList.remove("menu-toggle");
   dropMenu.classList.remove("drop-toggle");
   modalReg.classList.remove("modal-show");
   dropMenuAuth.classList.remove("drop-toggle");
});

//Profile drop menu
profileButton.addEventListener("click", (evt) => {
   evt._isClickWithInMenu = true;
   dropMenu.classList.toggle("drop-toggle");
   header.classList.remove("menu-toggle");
});


// Loged in user profle icon click 
userProfile.addEventListener("click", (evt) => {
   evt._isClickWithInMenu = true;
   dropMenuAuth.classList.toggle("drop-toggle");
   header.classList.remove("menu-toggle");
});



//Drop menu register
register.addEventListener("click", (evt) => {
   evt.preventDefault();
   dropMenu.classList.toggle("drop-toggle");
   modalReg.classList.add("modal-show");
   regFirstName.focus();
});

modalRegClose.addEventListener("click", () => {
   modalReg.classList.remove("modal-show");
});

getCardReg.addEventListener("click", (evt) => {
   evt.preventDefault();
   evt._isClickWithInMenu = true;
   modalReg.classList.add("modal-show");
});


// New user register submit

registerForm.addEventListener("submit", (evt) => {
   evt.preventDefault();
   let oldStorage = [];
   let cardNumber = getRandomInt(10000000000,59999999999).toString(16).toUpperCase();

   newUser = { name: regFirstName.value, lastname: regLastName.value, mail: regEmail.value, pass: regPassword.value, cardNumber};
   try {
      let currentStorage = localStorage.getItem('users');
      
      if (!!currentStorage) oldStorage = JSON.parse(currentStorage);
   } catch(err) {
      isStorageSupport = false;
   }
   oldStorage.push(newUser);
   localStorage.setItem('users', JSON.stringify(oldStorage));

   modalReg.classList.remove("modal-show");
   profileButton.classList.add("visually-hidden");
   userProfile.textContent = `${newUser.name[0].toUpperCase()}${newUser.lastname[0].toUpperCase()}`;
   userProfile.classList.remove("visually-hidden");
});


// Find your Library card
checkCard.addEventListener("click", (evt) => {
   evt.preventDefault();
});

