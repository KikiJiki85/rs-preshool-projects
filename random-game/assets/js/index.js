import { View } from "./view.js";

const menu = document.querySelector('[data-id="menu"]');
const menuItems = menu.querySelector('[data-id="menu__items"]');
const resetBtn = menu.querySelector('[data-id="menu__reset"]');
const newRoundBtn = menu.querySelector('[data-id="menu__new-round"]');
const fields = document.querySelectorAll('[data-id="field"]');
const modal = document.querySelector('[data-id="modal"]');
const modalWinner = modal.querySelector('[data-id="modal-winner"]');
const modalPlayAgain = modal.querySelector('[data-id="modal-playagain"]');
const turnIcon = document.querySelector('[data-id="turn-icon"]');
const turnPlayer = document.querySelector('[data-id="turn-player"]');

const state = {
    moves: []
};

const winningPatterns = [
    [1,2,3],
    [1,5,9],
    [1,4,7],
    [2,5,8],
    [3,5,7],
    [3,6,9],
    [4,5,6],
    [7,8,9]
];

function getGameStatus(moves) {
    const player1Moves = moves.filter((move) => move.player === 1).map(move => Number(move.fieldId));
    const player2Moves = moves.filter((move) => move.player === 2).map(move => Number(move.fieldId));

    let winner = null;

    winningPatterns.forEach((pattern) => {
        const player1Wins = pattern.every(value => player1Moves.includes(value));
        const player2Wins = pattern.every(value => player2Moves.includes(value));

        if(player1Wins) winner = 1;
        if(player2Wins) winner = 2;
    });

    return {
        status: moves.length === 9 || winner !== null ? 'finish' : 'in-progress',
        winner,
    }
}


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

    modalPlayAgain.addEventListener('click', () => {
        state.moves = [];
        fields.forEach(field => field.replaceChildren());
        modal.classList.toggle('modal-show');
    });
    
    fields.forEach((field) => 
        field.addEventListener('click', (evt) => {
           
            const hasMove = (fieldId) => {
                const madeMove = state.moves.find((move) => move.fieldId === fieldId);
                return madeMove !== undefined;
            };

            if (hasMove(Number(field.id))) return;

            const lastMove = state.moves.at(-1); // equals - state.moves[moves.length - 1]
            const getNextPlayer = (player) => player === 1 ? 2 : 1;
            const currentPlayer = state.moves.length === 0 ? 1 : getNextPlayer(lastMove.player);


            const icon = document.createElement('span');

            if (currentPlayer === 1) {
                icon.classList.add('ttt-app__x-icon');
                turnIcon.classList.remove('ttt-app__o-icon','ttt-app__o-icon--small');
                setTimeout(() => {
                    turnIcon.classList.add('ttt-app__x-icon','ttt-app__x-icon--small');
                }); 
                turnPlayer.textContent = `Player ${currentPlayer}, your turn`;
                
            } else {
                icon.classList.add('ttt-app__o-icon');
                turnIcon.classList.remove('ttt-app__x-icon','ttt-app__x-icon--small');
                setTimeout(() => {
                    turnIcon.classList.add('ttt-app__o-icon','ttt-app__o-icon--small');
                })
                turnPlayer.textContent = `Player ${currentPlayer}, your turn`;
            }

            state.moves.push({
                player: currentPlayer,
                fieldId: Number(field.id)
            });
            
            field.replaceChildren(icon);

            const game = getGameStatus(state.moves);

            if (game.status === 'finish') {
                modal.classList.toggle('modal-show');

                let message = '';

                if (game.winner) {
                    message = `Player ${game.winner} wins!`;
                } else {
                    message = `It's a tie game!`;
                }

                modalWinner.textContent = message;
            }

    }));
}


function init() {
    const view = new View(); 

    view.setGameResetEvent(evt => {
        console.log(evt);
    });

    view.setNewRoundEvent(evt => {
        console.log(evt);
    });

    view.setPlayerMoveEvent(evt => {
        view.setCurrentTurn(2);
        view.setCurrentMove(evt.target,1);
        console.log(evt)
    });
}

document.addEventListener('DOMContentLoaded', init);