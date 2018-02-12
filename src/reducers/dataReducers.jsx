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
           error: '',
           next_href: '',
           items: state[action.store] ? state[action.store].items : [] 
        })
    });
}

let handleSucReceive = (state, action) => {
    return Object.assign({}, state, {
        [action.store]: {
            isFetching: false,
            hasError: false,
            error: '',
            next_href: 'http://localhost:8080' + action.next_url,
            items: state[action.store].items.concat(action.data)//action.data.concat(state[action.store].items)//Object.assign({},state[action.store].items,action.items)
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