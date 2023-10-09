export class View {

    constructor() {

        this.menu = document.querySelector('[data-id="menu"]');
        this.menuBtn = document.querySelector('[data-id="menu-btn"]');
        this.menuItems = document.querySelector('[data-id="menu__items"]');
        this.resetBtn = document.querySelector('[data-id="menu__reset"]');
        this.newRoundBtn = document.querySelector('[data-id="menu__new-round"]');
        this.fields = document.querySelectorAll('[data-id="field"]');
        this.modal = document.querySelector('[data-id="modal"]');
        this.modalWinner = document.querySelector('[data-id="modal-winner"]');
        this.modalPlayAgain = document.querySelector('[data-id="modal-playagain"]');
        this.turnIcon = document.querySelector('[data-id="turn-icon"]');
        this.turnPlayer = document.querySelector('[data-id="turn-player"]');

        this.menuBtn.addEventListener("click", () => {
            this.toggleMenu();
        });
        
    }

    setGameResetEvent(handler) {
        this.resetBtn.addEventListener('click', handler);
    }

    setNewRoundEvent(handler) {
        this.newRoundBtn.addEventListener('click', handler);
    }

    setPlayerMoveEvent(handler) {
        this.fields.forEach(field => {
            field.addEventListener('click', handler);
        });
    }

    toggleMenu() {
        this.menuItems.classList.toggle('modal-show');
        this.menuBtn.classList.toggle('outline');
    };
}
