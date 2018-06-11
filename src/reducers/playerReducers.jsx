const initialState = {
    isPlaying: false,
    repeat: false,
    shuffle: false,
    volume: 0.5,
    history: [],
    currentSong: null,
    playNext: [],
    future: []
};

export let reducers = (state = initialState, action) => {
    switch(action.type) {
        case 'PLAY':
            return play(state, action);
        case 'PAUSE':
            return pause(state, action);
        case 'NEXT':
            return next(state, action);
        case 'PREVIOUS':
            return previous(state, action);
        case 'TOGGLE_SHUFFLE':
            return toggleShuffle(state, action);
        case 'TOGGLE_REPEAT':
            return toggleRepeat(state, action);
        case 'ADD_SONGS': 
            return addSongs(state, action);
        case 'SET_SONGS':
            return setSongs(state, action);
        case 'ADD_PLAYNEXT':
            return addPlayNext(state, action);
        case 'REMOVE_HISTORY':
            return removeFromHistory(state, action);
        case 'REMOVE_FUTURE':
            return removeFromFuture(state, action);
        case 'REMOVE_PLAYNEXT':
            return removeFromPlayNext(state, action);
        default: 
            return state;
    }
};

let play = (state, action) => {
    return Object.assign({}, state, {
        isPlaying: true
    });
};

let pause = (state, action) => {
    return Object.assign({}, state, {
        isPlaying: false 
    });
};

let next = (state, action) => {
    let playList = Object.assign({}, {
        history: state.history, 
        currentSong : state.currentSong, 
        playNext: state.playNext,
        future: state.future
    });
    if(playList.currentSong != null)
        playList.history.push(playList.currentSong);
    playList.currentSong = playList.playNext.length > 0 ? playList.playNext.shift() : playList.future.length > 0 ? playList.future.shift() : null; // TODO: repeat!
    return Object.assign({}, state, {
        ...playList
    });
};

let previous = (state, action) => {
    let playList = Object.assign({}, {
        history: state.history, 
        currentSong : state.currentSong, 
        playNext: state.playNext,
        future: state.future
    });
    if(playList.currentSong != null)
        playList.future.unshift(playList.currentSong);
    playList.currentSong = playList.history.length > 0 ? playList.history.pop() : null;
    return Object.assign({}, state, {
        ...playList
    });
};

let toggleShuffle = (state, action) => {
    return Object.assign({}, state, {
        shuffle: !state.shuffle
    });
};

let toggleRepeat = (state, action) => {
    return Object.assign({}, state, {
        repeat: !state.repeat
    });
};

let addSongs = (state, action) => {
    return Object.assign({}, state, {
        future: state.future.concat(action.songs)
    });
};

let setSongs = (state, action) => {
    return Object.assign({}, state, {
        history: action.index > 0 ? action.songs.slice(0,action.index) : [],
        currentSong: action.songs[action.index],
        future: action.songs.slice(action.index+1)
    })
}

let addPlayNext = (state, action) => {
    return Object.assign({}, state, {
        playNext: state.playNext.concat(action.songs)
    });
};

let removeFromHistory = (state, action) => {
    return Object.assign({}, state, {
        history: state.history.filter((v,i) => i!=action.index)
    });
}

let removeFromPlayNext = (state, action) => {
    return Object.assign({}, state, {
        playNext: state.playNext.filter((v,i) => i!=action.index)
    })
}

let removeFromFuture = (state, action) => {
    return Object.assign({}, state, {
        future: state.future.filter((v,i) => i!=action.index)
    })
}