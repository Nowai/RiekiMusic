import * as actions from 'DataActions';

const url = 'http://localhost:8080/songs';
const base_url = 'http://localhost:8080';

// ####
// Helper Functions
// ####

// transforms the raw data from the request into a usable form
let dataMapper = (data) => {
    return {
        next_href: data.next_href ? base_url + data.next_href : null,
        data: songSanitize(data.songs)
    }
}

// fixes the uncomplete cover url in the raw data
let songSanitize = (songs) => {
    return songs.map((song) => { return {...song, cover_url: base_url + song.cover_url, song_url: url + `/file/${song.songId}`}});
}

export let getPage = () => {
    return (dispatch, getState) => {
        dispatch(actions.getPage('songs', url, dataMapper));
    }
}

export let getNextPage = () => {
    return (dispatch, getState) => {
        dispatch(actions.getNextPage('songs', dataMapper));
    }
}
