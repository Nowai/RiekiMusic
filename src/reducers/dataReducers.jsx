const initialState = {
};

export let reducers = (state = initialState, action) => {
    switch(action.type) {
        case 'DATA_REQUEST':
            return handleRequest(state, action);
        case 'DATA_SUC_RECEIVE':
            return handleSucReceive(state, action);
        case 'DATA_ERR_RECEIVE':
            return handleErrReceive(state, action);
        default:
            return state;
    }
}

let handleRequest = (state, action) => {
    return Object.assign({}, state, {
        [action.store]: Object.assign({}, state[action.store], {
           isFetching: true,
           hasError: false,
           error: null,
           next_href: null,
           items: state[action.store] ? state[action.store].items : [] 
        })
    });
}

let handleSucReceive = (state, action) => {
    console.log(action);
    return Object.assign({}, state, {
        [action.store]: {
            isFetching: false,
            hasError: false,
            error: null,
            next_href: action.next_href ? action.next_href : null,
            items: (state[action.store].items && Array.isArray(action.data)) ? state[action.store].items.concat(action.data) : action.data
    }});
}

let handleErrReceive = (state, action) => {
    return Object.assign({}, state, {
        [action.store]: {
           ...state[action.store],
           error: action.error,
           hasError: true
        }
    });
}