const menu = document.querySelector('.ttt-app__menu');
const menuItems = menu.querySelector('.ttt-app__menu-items');

menu.addEventListener('click', () => {
    menuItems.classList.toggle('modal-show');
});