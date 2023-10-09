export class View {

    constructor() {

        this.menu = document.querySelector('[data-id="menu"]');
        this.menuBtn = document.querySelector('[data-id="menu-btn"]');
        this.menuIcon = document.querySelector('[data-id="menu-icon"]');
        this.menuItems = document.querySelector('[data-id="menu__items"]');
        this.resetBtn = document.querySelector('[data-id="menu__reset"]');
        this.newRoundBtn = document.querySelector('[data-id="menu__new-round"]');
        this.fields = document.querySelectorAll('[data-id="field"]');
        this.modal = document.querySelector('[data-id="modal"]');
        this.modalWinner = document.querySelector('[data-id="modal-winner"]');
        this.modalPlayAgain = document.querySelector('[data-id="modal-playagain"]');
        this.turn = document.querySelector('[data-id="turn"]');
        this.turnIcon = document.querySelector('[data-id="turn-icon"]');
        this.turnPlayer = document.querySelector('[data-id="turn-player"]');

        this.menuBtn.addEventListener("click", () => {
            this._toggleMenu();
        });
        
    }

    setGameResetEvent(handler) {
        this.resetBtn.addEventListener('click', handler);
        this.modalPlayAgain.addEventListener('click', handler);
    }

    setNewRoundEvent(handler) {
        this.newRoundBtn.addEventListener('click', handler);
    }

    setPlayerMoveEvent(handler) {
        this.fields.forEach(field => {
            field.addEventListener('click', () => handler(field));
        });
    }

    _toggleMenu() {
        this.menuItems.classList.toggle('modal-show');
        this.menuBtn.classList.toggle('outline-element');
        this.menuIcon.classList.toggle('rotate-element');
    };

    _closeModal() {
        this.modal.classList.remove('modal-show');
    }

    setCurrentTurn(gamer) {
        const fragment = document.createDocumentFragment();
        const span = fragment.appendChild(document.createElement('span'));
        const p = fragment.appendChild(document.createElement('p'));
        span.classList.add(gamer.classes[0], gamer.classes[1]);
        p.classList.add('ttt-app__player-turn');
        p.textContent = `${gamer.name}, your turn`;

        this.turn.replaceChildren(fragment);
    }

    setCurrentMove(field, gamer) {
        const icon = document.createElement('span');
        icon.classList.add(gamer.classes[0]);
        field.replaceChildren(icon);
    }

    openModal(msg) {
        this.modal.classList.add('modal-show');
        this.modalWinner.textContent = msg;
    }
    
    closeAll() {
        this._closeModal();
        this._toggleMenu();
    }

    clearFields() {
        this.fields.forEach(field => field.replaceChildren());
    }
}
