const startingValue = {
    moves: [],
    history: {
        games: [],
        actualGames: []
    }
};

const winningOptions = [
    [1,2,3],
    [1,5,9],
    [1,4,7],
    [2,5,8],
    [3,5,7],
    [3,6,9],
    [4,5,6],
    [7,8,9]
];

export class Model {

    _state = startingValue;

    constructor(gamers) {
        this.gamers = gamers;
    }

    get game() {
        const state = this._getState();
        const currentGamer = this.gamers[state.moves.length % 2];

        let winner = null;

        for(let gamer of this.gamers) {
            const selectedFieldIds = state.moves
                .filter(move => move.gamer.id === gamer.id)
                .map(move => move.fieldId);
    
            winningOptions.forEach(pattern => {
                if (pattern.every( value => selectedFieldIds.includes(value))) {
                    winner = gamer;
                }
            });
        }

        return {
            currentGamer,
            moves: state.moves,
            status: {
                winner,
                isFinished: winner !== null || state.moves.length === 9
            }
        }
    }

    get stats() {
        const state = this._getState();

        return {
            playerWithStats: this.gamers.map(gamer => {
                const wins = state.history.actualGames.filter(game => game.status.winner?.id === gamer.id).length;
                return {
                    ...gamer,
                    wins
                };
            }),
            ties: state.history.actualGames.filter(game => game.status.winner === null).length
        }
    }

    gamerMove(fieldId) {

        const stateClone = structuredClone(this._getState());

        stateClone.moves.push({
            fieldId,
            gamer: this.game.currentGamer
        });
        this._setState(stateClone);
    }

    resetGame() {
        const stateClone = structuredClone(this._getState());

        const {status, moves} = this.game;
        if (status.isFinished) {
            stateClone.history.actualGames.push({moves,status});
        }

        stateClone.moves = [];
        this._setState(stateClone);
    }

    setNewRound() {
        this.resetGame();
        const stateClone = structuredClone(this._getState());
        stateClone.history.games.push(...stateClone.history.actualGames);
        stateClone.history.actualGames = [];
        this._setState(stateClone);
    }

    _getState() {
        return this._state;
    }
    
    _setState(updateState) {
        const prevState = this._getState();
        console.log(this._getState());

        let newState;

        switch (typeof updateState) {
            case 'object':
                newState = updateState;
                break;
            case 'function':
                newState = updateState(prevState);
                break;
            default:
                throw new Error('Wrong input passed to setState');
        }
        this._state = newState;
    }
}