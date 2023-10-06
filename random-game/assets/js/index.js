const menu = document.querySelector('[data-id="menu"]');
const menuItems = menu.querySelector('[data-id="menu__items"]');
const resetBtn = menu.querySelector('[data-id="menu__reset"]');
const newRoundBtn = menu.querySelector('[data-id="menu__new-round"]');
const fields = document.querySelectorAll('[data-id="field"]');


function registerEventListeners() {
    menu.addEventListener('click', () => {
        menuItems.classList.toggle('modal-show');
    });
    
    resetBtn.addEventListener('click', () => {
        console.log('Reset the game');
    });
    
    newRoundBtn.addEventListener('click', () => {
        console.log('New round');
    });
    
    fields.forEach((el) => 
        el.addEventListener('click', (evt) => {
            console.log(`click on ${evt.target.id} element`);
    }));
}

document.addEventListener('DOMContentLoaded', registerEventListeners);