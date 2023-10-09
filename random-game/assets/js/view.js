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
        this.turnIcon = document.querySelector('[data-id="turn-icon"]');
        this.turnPlayer = document.querySelector('[data-id="turn-player"]');

        this.menuBtn.addEventListener("click", () => {
            this._toggleMenu();
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

    _toggleMenu() {
        this.menuItems.classList.toggle('modal-show');
        this.menuBtn.classList.toggle('outline-element');
        this.menuIcon.classList.toggle('rotate-element');
    };

    setCurrentTurn(p = 2) {
        this.turnPlayer.textContent = `Player ${p}, your turn`;

        if (p === 1) {
            this.turnIcon.classList.remove('ttt-app__o-icon','ttt-app__o-icon--small');
            setTimeout(() => {
                this.turnIcon.classList.add('ttt-app__x-icon','ttt-app__x-icon--small');
            }); 
           
        } else {
            this.turnIcon.classList.remove('ttt-app__x-icon','ttt-app__x-icon--small');
            setTimeout(() => {
                this.turnIcon.classList.add('ttt-app__o-icon','ttt-app__o-icon--small');
            })
        }
    }

    setCurrentMove(field, p = 2) {
        const icon = document.createElement('span');
        icon.classList.add(p === 1 ? 'ttt-app__x-icon' : 'ttt-app__o-icon');
        field.replaceChildren(icon);
    }
}
