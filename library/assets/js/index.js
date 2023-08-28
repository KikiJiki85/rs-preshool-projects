
const header = document.querySelector(".header");
const menuToggle = header.querySelector(".header-burger");
const menu = header.querySelector(".nav-list");
const menuLinks = header.querySelectorAll(".nav-link");

const profileButton = header.querySelector(".profile-button");
const dropMenu = header.querySelector(".drop-menu");
const dropMenuAuth = header.querySelector(".drop-menu-auth");
const dropMenuAuthTitle = header.querySelector(".drop-menu-auth__title");
const dropMenuAuthProfile = header.querySelector(".drop-menu-auth__profile");
const register = header.querySelector(".drop-menu__register");
const login = header.querySelector(".drop-menu__login");

const modalReg = document.querySelector(".modal-register");
const modalRegContainer = modalReg.querySelector(".modal-register__wrapper");
const modalRegClose = modalReg.querySelector(".modal-register__close");
const modalRegToModalLog = modalReg.querySelector(".modal-register__login");

const getCardReg = document.querySelector(".library-card-get__register");
const getCardLog = document.querySelector(".library-card-get__login");

const registerForm = modalReg.querySelector(".modal-register__form");
const regFirstName = modalReg.querySelector("#register-first-name");
const regLastName = modalReg.querySelector("#register-last-name");
const regEmail = modalReg.querySelector("#register-email");
const regPassword = modalReg.querySelector("#register-password");

const modalLog = document.querySelector(".modal-login");
const modalLogContainer = modalLog.querySelector(".modal-login__wrapper");
const modalLogClose = modalLog.querySelector(".modal-login__close");
const modalLogToModalReg = modalLog.querySelector(".modal-login__register");
const loginForm = modalLog.querySelector(".modal-login__form");
const loginName = modalLog.querySelector("#login-name");
const loginPass = modalLog.querySelector("#login-password");
const loginBtn = modalLog.querySelector(".modal-login__btn");

const userProfile = header.querySelector(".profile-user");
const modalProf = document.querySelector(".modal-myprofile");
const modalProfContainer = modalProf.querySelector(".modal-myprofile__wrapper");
const modalProfClose = modalProf.querySelector(".modal-myprofile__close");
const modalProfLogo = modalProf.querySelector(".modal-myprofile__logo");
const modalProfName = modalProf.querySelector(".modal-myprofile__name");
const modalProfCardNumber = modalProf.querySelector(".modal-myprofile__card-number");
const modalProfCopy = modalProf.querySelector(".modal-myprofile__copy");

const libraryCardSearchForm = document.querySelector(".library-card-search__form");
const checkCard = libraryCardSearchForm.querySelector(".form-search-btn");
const findCardName = libraryCardSearchForm.querySelector("#reader-name");
const findCardNumber = libraryCardSearchForm.querySelector("#card-number");
const findCardInput = libraryCardSearchForm.querySelectorAll(".library-card-search__input");
const userInfo = libraryCardSearchForm.querySelector(".user-info");

const bookBuy = document.querySelectorAll(".book-buy");

let isStorageSupport = true;
let isUserLogedIn = false;
let libLocalStorage = [];
let newUser = {};

if(!isUserLogedIn) {
   bookBuy.forEach((el) => {
       el.addEventListener("click", (evt) =>  {
         evt.preventDefault();
         evt._isClickWithInMenu = true;
         modalLog.classList.add("modal-show");
      })
   });
}

//Random int function

function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max - min)) + min;
}

//LocalStorage get users data 

function getUsersData() {
   try {
      let currentStorage = localStorage.getItem('users');
      
      if (!!currentStorage) libLocalStorage = JSON.parse(currentStorage);
   } catch(err) {
      isStorageSupport = false;
   }
};

//LocalStorage update

function updateUsersData(obj) {

   libLocalStorage.push(obj);
   libLocalStorage = [...new Set(libLocalStorage)];
   localStorage.setItem('users', JSON.stringify(libLocalStorage));
}

// Main menu

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
modalLogContainer.addEventListener("click", isClickWidthInMenuHandler);
modalProfContainer.addEventListener("click", isClickWidthInMenuHandler);


document.body.addEventListener("click", (evt) => {
   if (evt._isClickWithInMenu) return;
   header.classList.remove("menu-toggle");
   dropMenu.classList.remove("drop-toggle");
   modalReg.classList.remove("modal-show");
   modalLog.classList.remove("modal-show");
   modalProf.classList.remove("modal-show");
   dropMenuAuth.classList.remove("drop-toggle");
});

//Profile drop menu
profileButton.addEventListener("click", (evt) => {
   evt._isClickWithInMenu = true;
   dropMenu.classList.toggle("drop-toggle");
   header.classList.remove("menu-toggle");
});


// LogedIn user profle icon click 
userProfile.addEventListener("click", (evt) => {
   evt._isClickWithInMenu = true;
   dropMenuAuth.classList.toggle("drop-toggle");
   header.classList.remove("menu-toggle");
});



//Modal menu register
register.addEventListener("click", (evt) => {
   evt.preventDefault();
   dropMenu.classList.toggle("drop-toggle");
   modalReg.classList.add("modal-show");
   // regFirstName.focus();
});

modalRegClose.addEventListener("click", () => {
   modalReg.classList.remove("modal-show");
});

getCardReg.addEventListener("click", (evt) => {
   evt.preventDefault();
   evt._isClickWithInMenu = true;
   modalReg.classList.add("modal-show");
});

modalRegToModalLog.addEventListener("click", (evt) => {
   evt.preventDefault();
   modalReg.classList.remove("modal-show");
   modalLog.classList.add("modal-show");
});

//Modal menu login
login.addEventListener("click", (evt) => {
   evt.preventDefault();
   dropMenu.classList.toggle("drop-toggle");
   modalLog.classList.add("modal-show");
});

modalLogClose.addEventListener("click", () => {
   modalLog.classList.remove("modal-show");
});

getCardLog.addEventListener("click", (evt) => {
   evt.preventDefault();
   evt._isClickWithInMenu = true;
   modalLog.classList.add("modal-show");
});

modalLogToModalReg.addEventListener("click", (evt) => {
   evt.preventDefault();
   modalLog.classList.remove("modal-show");
   modalReg.classList.add("modal-show");
});

// Modal user profile 

dropMenuAuthProfile.addEventListener("click", (evt) => {
   evt.preventDefault();
   dropMenuAuth.classList.remove("drop-toggle");
   modalProf.classList.add("modal-show");
});

modalProfClose.addEventListener("click", () => {
   modalProf.classList.remove("modal-show");
});

modalProfCopy.addEventListener("click", () => {
   navigator.clipboard
      .writeText(modalProfCardNumber.textContent)
      .then(() => {})
      .catch(() => {});
});


// New user register submit

registerForm.addEventListener("submit", (evt) => {
   evt.preventDefault();
   let cardNumber = getRandomInt(10000000000,59999999999).toString(16).toUpperCase();

   newUser = { name: regFirstName.value, lastname: regLastName.value, mail: regEmail.value, pass: regPassword.value, cardNumber, visits: 1};

   getUsersData();
   updateUsersData(newUser);

   modalReg.classList.remove("modal-show");
   profileButton.classList.add("visually-hidden");
   userProfile.textContent = `${newUser.name[0].toUpperCase()}${newUser.lastname[0].toUpperCase()}`;
   userProfile.title = `${newUser.name} ${newUser.lastname}`;
   dropMenuAuthTitle.textContent = `${newUser.cardNumber}`;
   userProfile.classList.remove("visually-hidden");
   isUserLogedIn = true;
});

// New user login 

loginForm.addEventListener("submit", (evt) => {
   evt.preventDefault();

   getUsersData();

   let currentUser = libLocalStorage.filter((el) => 
               (el.mail === loginName.value || el.cardNumber === loginName.value) && el.pass === loginPass.value);
   if(!!currentUser.length) {
      currentUser = currentUser[0];
      currentUser.visits++;
      updateUsersData(currentUser);
      isUserLogedIn = true;
      modalLog.classList.remove("modal-show");
      profileButton.classList.add("visually-hidden");
      userProfile.classList.remove("visually-hidden");
      userProfile.textContent = `${currentUser.name[0].toUpperCase()}${currentUser.lastname[0].toUpperCase()}`;
      userProfile.title = `${currentUser.name} ${currentUser.lastname}`;
      dropMenuAuthTitle.textContent = `${currentUser.cardNumber}`;

      modalProfLogo.textContent = `${currentUser.name[0].toUpperCase()}${currentUser.lastname[0].toUpperCase()}`;
      modalProfName.textContent = `${currentUser.name} ${currentUser.lastname}`;
      modalProfCardNumber.textContent = `${currentUser.cardNumber}`;
       

   } else {
      loginName.classList.add("modal-invalid");
      loginPass.classList.add("modal-invalid");
      loginBtn.disabled = true;
      setTimeout(() => {
         loginName.classList.remove("modal-invalid");
         loginPass.classList.remove("modal-invalid");
         loginBtn.disabled = false;
      },3000);
   }

});

// Find your Library card

libraryCardSearchForm.addEventListener("submit", (evt) => {
   evt.preventDefault();
   let usersData = JSON.parse(localStorage.getItem("users"));
   let found = usersData.filter((el) => el.name === findCardName.value && el.cardNumber === findCardNumber.value);

   if(!!found.length) {
      checkCard.style = "display:none";
      userInfo.classList.remove("visually-hidden");
      findCardName.disabled = true;
      findCardNumber.disabled = true;
      setTimeout(() => {
         checkCard.style = "";
         userInfo.classList.add("visually-hidden");
         findCardName.value = "";
         findCardNumber.value = "";
         findCardName.disabled = false;
         findCardNumber.disabled = false;
      }, 10000);
      
   } else {
      console.log('no such user');
      findCardInput.forEach(el => el.classList.add("modal-invalid"));
      findCardName.disabled = true;
      findCardNumber.disabled = true;
      setTimeout(() => {
         findCardInput.forEach(el => el.classList.remove("modal-invalid"));
         findCardName.disabled = false;
         findCardNumber.disabled = false;
      },3000);
   }
   
});

