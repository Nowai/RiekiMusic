import {Howl} from 'howler';

const initialState = {
    currentIndex: 0,
    playlist: [],
    queueNext: [],
    shuffledPlaylist: [],
    shuffle: false,
    repeat: false,
    isPlaying: false,
    howl: null,
    volume: 1.0
};

export let reducers = (state = initialState, action) => {
    switch(action.type) {
        case 'TOGGLE_PLAY':
            return togglePlay(state, action);
        case 'TOGGLE_SHUFFLE':
            return toggleShuffle(state, action);
        case 'TOGGLE_REPEAT':
            return {...state, repeat: toggleRepeat(state.repeat, action)};
        case 'ADD_SONGS':
            return addSongs(state, action);
        case 'SET_SONGS':
            return setSongs(state, action);
        case 'CLEAR_SONGS':
            return clearSongs(state, action);
        case 'SET_INDEX': 
            return setIndex(state, action);
        case 'PLAY_NEXT':
            return playNext(state, action);
        case 'PLAY_PREVIOUS':
            return playPrevious(state, action);
        
        default: 
            return state;
    }
};

let clearSongs = (state, action) => {
    if(state.howl != null)
        state.howl.stop();
    return Object.assign({}, state, {
        playlist: [],
        queueNext: [],
        howl: null,
        isPlaying: false
    });
};

let setIndex = (state, action) => {
    return Object.assign({}, state, {
        currentIndex: action.index
    });
};

let playNext = (state, action) => {
    return Object.assign({}, state, {
        // todo
    });
};

export let playPrevious = (state = initialState, action) => {
    return state;
};

export let addQueueNext = (state, action ) => {
    return state;
};

let addSongs = (state, action) => {
    return Object.assign({}, state, {
        playlist: action.songs
    });
};

let setSongs = (state, action) => {
    let newState = {...state};
    newState.playlist = action.songs;
    newState.currentIndex = action.startIndex;
    newState = startPlay(newState,action);
    return newState;
    return Object.assign({}, state, {
        playlist: action
    });
}

let startPlay = (state, action) => {
    let newState = {...state};
    if(state.howl != null) {
        state.howl.stop();
    }
    newState.howl = new Howl({
        src: ['http://localhost:8080/songs/file/' + state.playlist[state.currentIndex].songId],
        autoplay: true,
        volume: state.volume,
        onend: () => { action.dispatch({type: 'TOGGLE_PLAY'}); },
        format: ['mp3']
    });
    newState.howl.play();
    newState.isPlaying = true;
    // TODO: ADD SHUFFLE
    return newState;
}

let togglePlay = (state, action) => {
    if(state.isPlaying) {
        state.howl.pause();
        return Object.assign({}, state, {
            isPlaying: false
        });
    }
    else {
        if(state.howl == null) {
            return startPlay(state, action);
        }
        else {
            state.howl.play();
            return Object.assign({}, state, {
                isPlaying: true
            });
        }
    }
}

let toggleShuffle = (state=false, action) => {
    let nextState = {...state};
    return {...state, shuffle: !state.shuffle};
};

let toggleRepeat = (state=false, action) => {
    return !state;
};

