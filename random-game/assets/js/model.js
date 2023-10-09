export class Model {

    _state = {moves: []}

    constructor() {}

    get game() {
        return 'test test';
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