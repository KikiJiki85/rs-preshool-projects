export class Model {

    _state = {moves: []}

    constructor(gamers) {
        this.gamers = gamers;
    }

    get game() {
        const state = this._getState();
        const currentGamer = this.gamers[state.moves.length % 2];
        return {
            currentGamer,
            moves: state.moves
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