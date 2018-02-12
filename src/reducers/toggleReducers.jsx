export let showLeftMenuReducer = (state=false, action) => {
    switch(action.type) {
        case 'TOGGLE_LEFT_MENU':
            return !state;
        default: 
            return state;
    }
};

export let showRightMenuReducer = (state=false, action) => {
    switch(action.type) {
        case 'TOGGLE_RIGHT_MENU':
            return !state;
        default: 
            return state;
    }
};