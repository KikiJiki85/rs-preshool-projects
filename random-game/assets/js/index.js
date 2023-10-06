const menu = document.querySelector('[data-id="menu"]');
const menuItems = menu.querySelector('[data-id="menu__items"]');
const resetBtn = menu.querySelector('[data-id="menu__reset"]');
const newRoundBtn = menu.querySelector('[data-id="menu__new-round"]');
const fields = document.querySelectorAll('[data-id="field"]');

const state = {
    currentPlayer: 1,
};


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
    
    fields.forEach((field) => 
        field.addEventListener('click', (evt) => {
            console.log(`click on ${evt.target.id} element`);

            if (field.hasChildNodes()) {
                console.log(field.childNodes);
                return;
            }

            const currentPlayer = state.currentPlayer;
            const icon = document.createElement('span');

            if (currentPlayer === 1) {
                icon.classList.add('ttt-app__x-icon');
            } else {
                icon.classList.add('ttt-app__o-icon');
            }

            state.currentPlayer = state.currentPlayer === 1 ? 2 : 1;
            
            
            field.replaceChildren(icon);

            // <span class="ttt-app__x-icon"></span>
            // <span class="ttt-app__o-icon"></span>
    }));
}

document.addEventListener('DOMContentLoaded', registerEventListeners);