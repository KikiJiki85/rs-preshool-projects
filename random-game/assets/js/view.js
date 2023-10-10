export class View {

    constructor() {

        this.menu = document.querySelector('.ttt-app__menu');
        this.menuBtn = document.querySelector('.ttt-app__menu-btn');
        this.menuIcon = document.querySelector('.ttt-app__menu-drop');
        this.menuItems = document.querySelector('.ttt-app__menu-items');
        this.resetBtn = document.querySelector('.ttt-app__reset');
        this.newRoundBtn = document.querySelector('.ttt-app__new-round');
        this.fields = document.querySelectorAll('.ttt-app__field');
        this.modal = document.querySelector('.ttt-app__modal');
        this.modalWinner = document.querySelector('.ttt-app__modal-text');
        this.modalPlayAgain = document.querySelector('.ttt-app__modal-btn');
        this.turn = document.querySelector('.ttt-app__turn');
        this.turnIcon = document.querySelector('.ttt-app__turn-icon');
        this.turnPlayer = document.querySelector('.ttt-app__player-turn');
        this.gamer1Wins = document.querySelector('.ttt-app__player1-wins');
        this.gamer2Wins = document.querySelector('.ttt-app__player2-wins');
        this.gameTiesCount = document.querySelector('.ttt-app__ties');


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

    _closeMenu() {
        this.menuItems.classList.remove('modal-show');
        this.menuBtn.classList.remove('outline-element');
        this.menuIcon.classList.remove('rotate-element');
    }

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
        this._closeMenu();
    }

    clearFields() {
        this.fields.forEach(field => field.replaceChildren());
    }

    updateResults(g1Wins, g2Wins, ties) {
        this.gamer1Wins.textContent = `${g1Wins} Wins`;
        this.gamer2Wins.textContent = `${g2Wins} Wins`;
        this.gameTiesCount.textContent = `${ties}`;
    }
}
