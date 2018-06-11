import * as redux from 'redux';
import thunk from 'redux-thunk';
import * as playerReducers from 'reducers/playerReducers';
import * as dataReducers from 'reducers/dataReducers';

export let configure = (initialState = {}) => {
    let reducer = redux.combineReducers({
        player: playerReducers.reducers,
        data: dataReducers.reducers
    });

    let store = redux.createStore(reducer, initialState, redux.applyMiddleware(thunk),redux.compose(
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

    return store;
}
