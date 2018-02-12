export let playNext = () => {
    return {
        type: 'PLAY_NEXT'
    }
};

export let playPrevious = () => {
    return {
        type: 'PLAY_PREVIOUS'
    }
};

export let togglePlay = () => {
    return {
        type: 'TOGGLE_PLAY'
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

export let clearSongs = () => {
    return {
        type: 'CLEAR_SONGS'
    };
};

export let setIndex = (index) => {
    return {
        type: 'SET_INDEX',
        index
    };
}

export let setSongs = (songs, index) => {
    return (dispatch, getState) => {
        const state = getState();
        const isPlaying = state.player.isPlaying;

        // if we are currently playing a song, stop it
        if(isPlaying)
            dispatch(togglePlay());
        // clear all songs
        dispatch(clearSongs());

        // set new songs
        dispatch(addSongs(songs));

        // set index
        dispatch(setIndex(index));

        // if we played at the start, resume playing now
        if(isPlaying) {
            dispatch(togglePlay());
        }
    };
};

export let addSongs = (songs) => {
    return {
        type: 'ADD_SONGS',
        songs: songs
    };
};

