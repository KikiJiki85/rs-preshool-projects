
const header = document.querySelector(".header");
const menuToggle = header.querySelector(".header-burger");
const menu = header.querySelector(".nav-list");
const menuLinks = header.querySelectorAll(".nav-link");

const profileButton = header.querySelector(".profile-button");
const dropMenu = header.querySelector(".drop-menu");
const dropMenuAuth = header.querySelector(".drop-menu-auth");
const dropMenuAuthTitle = header.querySelector(".drop-menu-auth__title");
const dropMenuAuthProfile = header.querySelector(".drop-menu-auth__profile");
const dropMenuAuthLogout = header.querySelector(".drop-menu-auth__logout");
const register = header.querySelector(".drop-menu__register");
const login = header.querySelector(".drop-menu__login");

const modalReg = document.querySelector(".modal-register");
const modalRegContainer = modalReg.querySelector(".modal-register__wrapper");
const modalRegClose = modalReg.querySelector(".modal-register__close");
const modalRegToModalLog = modalReg.querySelector(".modal-register__login");

const getCardReg = document.querySelector(".library-card-get__register");
const getCardLog = document.querySelector(".library-card-get__login");
const getCardProf = document.querySelector(".library-card-get__profile");

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
const modalProfVisits = modalProf.querySelector(".user-info__item--visits");
const modalProfBooks = modalProf.querySelector(".user-info__item--books");
const modalProfBooksList = modalProf.querySelector(".modal-myprofile__books");
const modalProfCopy = modalProf.querySelector(".modal-myprofile__copy");

const modalBuyACard = document.querySelector(".modal-buycard");
const modalBuyACardContainer = modalBuyACard.querySelector(".modal-buycard__wrapper");
const modalBuyACardForm = modalBuyACard.querySelector(".modal-buycard__form");
const modalBuyACardClose = modalBuyACard.querySelector(".modal-buycard__close");
const modalBuyACardButton = modalBuyACard.querySelector(".modal-buycard__button");

const digitalLibraryCardSection = document.querySelector(".library-card");
const cardSearchHeader = digitalLibraryCardSection.querySelector(".library-card-search__header");
const cardGetHeader = digitalLibraryCardSection.querySelector(".library-card-get__header");
const cardGetText = digitalLibraryCardSection.querySelector(".library-card-get__text");

const libraryCardSearchForm = digitalLibraryCardSection.querySelector(".library-card-search__form");
const checkCard = libraryCardSearchForm.querySelector(".form-search-btn");
const findCardName = libraryCardSearchForm.querySelector("#reader-name");
const findCardNumber = libraryCardSearchForm.querySelector("#card-number");
const findCardInput = libraryCardSearchForm.querySelectorAll(".library-card-search__input");
const userInfo = libraryCardSearchForm.querySelector(".user-info");
const cardVisits = libraryCardSearchForm.querySelector(".user-info__item--visits");
const cardBooks = libraryCardSearchForm.querySelector(".user-info__item--books");

const bookBuy = document.querySelectorAll(".book-buy");
const booksList = document.querySelectorAll(".fav-filter-item");

let isStorageSupport = true;
let isUserLogedIn = false;
let libLocalStorage = [];
let newUser = {};
let currentUser = {};
let singleBookAdd = false;

updateBooks();

function modalLoginBooksHandler(evt) {
   evt.preventDefault();
   evt._isClickWithInMenu = true;
   modalLog.classList.toggle("modal-show");
}

function modalLoginNoLibCardHandler(evt) {
   evt.preventDefault();
   evt._isClickWithInMenu = true;
   modalBuyACard.classList.toggle("modal-show");
}

function updateBookOwnship(element) {
   element.classList.remove("book-buy");
   element.classList.add("book-own");
   element.textContent = 'Own';
   element.disabled = true;
}

function modalLoginHasLibCardHandler(evt) {
   evt.preventDefault();
   evt._isClickWithInMenu = true;
   updateBookOwnship(evt.target);
   currentUser.books.push(evt.target.closest('.fav-filter-item')
                                    .querySelector(".fav-filter-item__header")
                                    .textContent.split('by'));
   updateUsersData(currentUser);
   updateBooks();
   singleBookAdd = true;
   updateProfile();
}

function updateBooks() {
   if(!isUserLogedIn) {
      bookBuy.forEach((el) => {
          el.addEventListener("click", modalLoginBooksHandler);
          el.removeEventListener("click", modalLoginNoLibCardHandler);
      })
   } else if (isUserLogedIn && !currentUser.hasLibraryCard) {
      bookBuy.forEach((el) => {
         el.removeEventListener("click", modalLoginBooksHandler);
         el.addEventListener("click", modalLoginNoLibCardHandler);
      })
   } else {
      booksList.forEach(el => {
         for(let i = 0; i < currentUser.books.length; i++) {
            let bookOwn = !el.querySelector(".fav-filter-item__header").textContent.indexOf(currentUser.books[i][0]);
           if (bookOwn && !!el.querySelector(".book-buy")) updateBookOwnship(el.querySelector(".book-buy"));
         }
      });
      bookBuy.forEach((el) => {
         el.removeEventListener("click", modalLoginBooksHandler);
         el.removeEventListener("click", modalLoginNoLibCardHandler);
         el.addEventListener("click", modalLoginHasLibCardHandler);
      })
   }
}

function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max - min)) + min;
}

function getUsersData() {
   try {
      let currentStorage = localStorage.getItem('users');
      
      if (!!currentStorage) libLocalStorage = JSON.parse(currentStorage);
   } catch(err) {
      isStorageSupport = false;
   }
};

function updateUsersData(obj) {

   libLocalStorage.push(obj);
   libLocalStorage = [...new Set(libLocalStorage)];
   localStorage.setItem('users', JSON.stringify(libLocalStorage));
}

function showLibraryCard() {
   checkCard.style = "display:none";
   userInfo.classList.remove("visually-hidden");
   findCardName.disabled = true;
   findCardNumber.disabled = true;
   cardVisits.textContent = `${currentUser.visits}`;
   cardBooks.textContent = `${currentUser.books.length}`;
}

function hideLibraryCard() {
   checkCard.style = "";
   userInfo.classList.add("visually-hidden");
   findCardName.value = "";
   findCardNumber.value = "";
   findCardName.disabled = false;
   findCardNumber.disabled = false;
}

function updateDLCSection(user) {
   cardSearchHeader.textContent = isUserLogedIn ? 'Your Library card' : 'Find your Library card';
   cardGetHeader.textContent = isUserLogedIn ? 'Visit your profile' : 'Get a reader card';
   cardGetText.textContent = isUserLogedIn ? `With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.` : 'You will be able to see a reader card after logging into account or you can register a new account';
   getCardReg.classList.toggle("visually-hidden");
   getCardLog.classList.toggle("visually-hidden");
   getCardProf.classList.toggle("visually-hidden");
   findCardName.value = isUserLogedIn ? user.name : "";
   findCardNumber.value = isUserLogedIn ? user.cardNumber : "";
   isUserLogedIn ? showLibraryCard() : hideLibraryCard();
}

function updateProfile() {
   modalProfVisits.textContent = `${currentUser.visits}`;
   modalProfBooks.textContent = `${currentUser.books.length}`;
   cardVisits.textContent = `${currentUser.visits}`;
   cardBooks.textContent = `${currentUser.books.length}`;
   if(!singleBookAdd) {
      currentUser.books.forEach((element) => {
         const fragment = document.createDocumentFragment();
         const li = fragment.appendChild(document.createElement("li"));
         li.classList.add("modal-myprofile__book");
         li.textContent = `${element[0]}, ${element[1]}`;
         modalProfBooksList.appendChild(fragment);
      });
   } else {
      const fragment = document.createDocumentFragment();
      const li = fragment.appendChild(document.createElement("li"));
      li.classList.add("modal-myprofile__book");
      li.textContent = `${currentUser.books[currentUser.books.length - 1][0]}, ${currentUser.books[currentUser.books.length - 1][1]}`;
      modalProfBooksList.appendChild(fragment);
   }
}

function logout() {
   isUserLogedIn = false;
   profileButton.classList.toggle("visually-hidden");
   userProfile.classList.toggle("visually-hidden");
   dropMenuAuth.classList.toggle("drop-toggle");
   updateDLCSection();
   updateBooks();
};

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
modalBuyACardContainer.addEventListener("click", isClickWidthInMenuHandler);


document.body.addEventListener("click", (evt) => {
   if (evt._isClickWithInMenu) return;
   header.classList.remove("menu-toggle");
   dropMenu.classList.remove("drop-toggle");
   modalReg.classList.remove("modal-show");
   modalLog.classList.remove("modal-show");
   modalProf.classList.remove("modal-show");
   dropMenuAuth.classList.remove("drop-toggle");
   modalBuyACard.classList.remove("modal-show");
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

// Logout

dropMenuAuthLogout.addEventListener("click", () => logout());

// Modal user profile 

dropMenuAuthProfile.addEventListener("click", (evt) => {
   evt.preventDefault();
   dropMenuAuth.classList.remove("drop-toggle");
   modalProf.classList.add("modal-show");
});

getCardProf.addEventListener("click", (evt) => {
   evt._isClickWithInMenu = true;
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

// Modal buy a card

modalBuyACardClose.addEventListener("click", (evt) => {
   evt._isClickWithInMenu = true;
   modalBuyACard.classList.toggle("modal-show");
});

modalBuyACardForm.addEventListener("submit", (evt) => {
   evt.preventDefault();
   modalBuyACard.classList.remove("modal-show");
   currentUser.hasLibraryCard = true;
   updateUsersData(currentUser);
   updateBooks();
});


// New user register submit

registerForm.addEventListener("submit", (evt) => {
   evt.preventDefault();
   let cardNumber = getRandomInt(10000000000,59999999999).toString(16).toUpperCase();

   currentUser = { name: regFirstName.value, lastname: regLastName.value, mail: regEmail.value, pass: regPassword.value, cardNumber, visits: 1, hasLibraryCard: false, books: []};

   getUsersData();
   updateUsersData(currentUser);

   modalReg.classList.remove("modal-show");
   profileButton.classList.add("visually-hidden");
   userProfile.textContent = `${currentUser.name[0].toUpperCase()}${currentUser.lastname[0].toUpperCase()}`;
   userProfile.title = `${currentUser.name} ${currentUser.lastname}`;
   dropMenuAuthTitle.textContent = `${currentUser.cardNumber}`;
   userProfile.classList.remove("visually-hidden");

   modalProfLogo.textContent = `${currentUser.name[0].toUpperCase()}${currentUser.lastname[0].toUpperCase()}`;
   modalProfName.textContent = `${currentUser.name} ${currentUser.lastname}`;
   modalProfCardNumber.textContent = `${currentUser.cardNumber}`;

   isUserLogedIn = true;
   updateProfile();
   updateBooks();
   updateDLCSection(currentUser);
});

// User login 

loginForm.addEventListener("submit", (evt) => {
   evt.preventDefault();

   getUsersData();

   currentUser = libLocalStorage.filter((el) => 
                  (el.mail === loginName.value || el.cardNumber === loginName.value) && el.pass === loginPass.value)[0];
   if(!!Object.keys(currentUser).length) {
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

      updateProfile();
      updateBooks();
      updateDLCSection(currentUser);   

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
   getUsersData();
   currentUser = libLocalStorage.filter((el) => el.name === findCardName.value && el.cardNumber === findCardNumber.value)[0] || {};
   if(!!Object.keys(currentUser).length) {
      showLibraryCard();
      setTimeout(() => hideLibraryCard(), 10000);
   } else {
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


