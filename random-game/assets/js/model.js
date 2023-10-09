const startingValue = {moves: []};

export class Model {

    _state = startingValue;

    constructor(gamers) {
        this.gamers = gamers;
    }

    get game() {
        const state = this._getState();
        const currentGamer = this.gamers[state.moves.length % 2];
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
        let winner = null;

        for(let gamer of this.gamers) {
            const selectedFieldIds = state.moves
                .filter(move => move.gamer.id === gamer.id)
                .map(move => move.fieldId);
    
            winningPatterns.forEach(pattern => {
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

    gamerMove(fieldId) {
        const state = this._getState();

        const stateClone = structuredClone(state);

        stateClone.moves.push({
            fieldId,
            gamer: this.game.currentGamer
        });
        this._setState(stateClone);
    }

    resetGame() {
        this._setState(startingValue);

    }

    _getState() {
        return this._state;
    }
    
    _setState(updateState) {
        const prevState = this._getState();

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