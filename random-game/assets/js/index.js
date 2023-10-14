import { View } from "./view.js";
import { Model } from "./model.js";

const GAMERS =  [
    {
        id: 1,
        name: 'Player 1',
        classes: ['ttt-app__x-icon','ttt-app__x-icon--small'],
    },
    {
        id: 2,
        name: 'Player 2',
        classes: ['ttt-app__o-icon','ttt-app__o-icon--small'],
    }
];

function init() {
    const view = new View(); 
    const model = new Model('ttt-app-history', GAMERS);

    function resetView() {
        view.closeAll();
        view.clearFields();
        view.setCurrentTurn(model.game.currentGamer);
        view.updateResults(model.stats.playerWithStats[0].wins,model.stats.playerWithStats[1].wins,model.stats.ties);
        view.setMoves(model.game.moves);
    }

    view.setGameResetEvent(() => {
        model.resetGame();
        resetView();
    });

    view.setNewRoundEvent(() => {
        model.setNewRound();
        resetView();
    });

    view.setPlayerMoveEvent(field => {
        const hasMove = model.game.moves.find(move => move.fieldId === Number(field.id));
        if (hasMove) return;

        view.setCurrentMove(field, model.game.currentGamer);
        model.gamerMove(Number(field.id));

        if(model.game.status.isFinished) {
            let msg = model.game.status.winner ? `${model.game.status.winner.name} wins` : `It's a tie game!`;
            view.openModal(msg);
            return; 
        }

        view.setCurrentTurn(model.game.currentGamer);

        
    });
    resetView();
}

document.addEventListener('DOMContentLoaded', init);