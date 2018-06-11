import * as actions from 'DataActions';
import * as playerActions from 'PlayerActions';

const url = 'http://localhost:8080/albums';
const base_url = 'http://localhost:8080';

let dataMapper = (data) => {
    return {
        next_href: data.next_href ? base_url + data.next_href : null,
        data: albumSanitize(data.albums)
    }
}

let directDataMapper = (data) => {
    return {
        next_href: null,
        data: directAlbumSanitize(data)
    }
}

let getAlbumSongs = (data) => {
    return directDataMapper(data).data.songs;
}

let albumSanitize = (albums) => {
    return albums.map((album) => {return {...album, cover_url: base_url + album.cover_url}})
}

let directAlbumSanitize = (data) => {
    return {
        ...data,
        songs: data.songs.map((song) => { return {...song, cover_url: base_url + song.cover_url, song_url: `${base_url}/songs/file/${song.songId}`}})
    }
}

export let getPage = () => {
    return (dispatch, getState) => {
        dispatch(actions.getPage('albums', url, dataMapper));
    }
}

export let getNextPage = () => {
    return (dispatch, getState) => {
        dispatch(actions.getNextPage('albums', dataMapper));
    }
}

export let getPageById  = (id) => {
    return (dispatch, getState) => {
        dispatch(actions.getPage('album', `${url}/${id}`, directDataMapper));
    }
}

export let playAlbumById = (id) => {
    return (dispatch, getState) => {
        dispatch(actions.getPageAndDispatch(`${url}/${id}`, playerActions.setSongs, getAlbumSongs));
    }
}

export let addAlbumById = (id) => {
    return (dispatch, getState) => {
        dispatch(actions.getPageAndDispatch(`${url}/${id}`, playerActions.addSongs, getAlbumSongs));
    }
}

export let addNextAlbumById = (id) => {
    return (dispatch, getState) => {
        dispatch(actions.getPageAndDispatch(`${url}/${id}`, playerActions.addPlayNext, getAlbumSongs));
    }
}