export let play = () => {
    return {
        type: 'PLAY'
    };
};

export let pause = () => {
    return {
        type: 'PAUSE'
    };
};

export let next = () => {
    return {
        type: 'NEXT'
    };
};

export let previous = () => {
    return {
        type: 'PREVIOUS'
    };
};

export let toggleShuffle = () => {
    return {
        type: 'TOGGLE_SHUFFLE'
    };
};

export let toggleRepeat = () => {
    return {
        type: 'TOGGLE_REPEAT'
    };
};

export let addSongs = (songs) => {
    return {
        type: 'ADD_SONGS',
        songs
    };
};

export let setSongs = (songs, index=0) => {
    return {
        type: 'SET_SONGS',
        songs,
        index
    };
};

export let addPlayNext = (songs) => {
    return {
        type: 'ADD_PLAYNEXT',
        songs
    };
};

export let removeFromHistory = (index) => {
    return {
        type: 'REMOVE_HISTORY',
        index
    };
};

export let removeFromFuture = (index) => {
    return {
        type: 'REMOVE_FUTURE',
        index
    };
};

export let removeFromPlayNext = (index) => {
    return {
        type: 'REMOVE_PLAYNEXT',
        index
    };
};