import * as actions from 'DataActions';
import * as playerActions from 'PlayerActions';

const url = 'http://localhost:8080/artists';
const base_url = 'http://localhost:8080';

let dataMapper = (data) => {
    return {
        next_href: data.next_href ? base_url + data.next_href : null,
        data: artistSanitize(data.artists)
    }
}

let directDataMapper = (data) => {
    return {
        next_href: null,
        data: directArtistSanitize(data)
    }
}

let artistSanitize = (artists) => {
    return artists.map((artist) => { return {...artist, cover_url: base_url + artist.cover_url}});
}

let artistToArrayMapper = (data) => {
    console.log(data);
    let r =  data.albums.map((album) => {
        return album.songs.map((song) => {
            return {
                ...song,
                cover_url: base_url + song.cover_url,
                song_url: `${base_url}/songs/file/${song.songId}`
            }
        })
    }).flatten();
    console.log(r);
    return r;
}

let directArtistSanitize = (data) => {
    return {
        ...data,
        albums: data.albums.map((album) => {
            return {
                ...album,
                songs: album.songs.map((song) => {
                    return {
                        ...song,
                        cover_url: base_url + song.cover_url,
                        song_url: `${base_url}/songs/file/${song.songId}`
                    }
                })
            }
        })
    }
}

export let getPage = () => {
    return (dispatch, getState) => {
        dispatch(actions.getPage('artists', url, dataMapper));
    }
}

export let getNextPage = () => {
    return (dispatch, getState) => {
        dispatch(actions.getNextPage('artists', dataMapper));
    }
}

export let getPageById = (id) => {
    return (dispatch, getState) => {
        dispatch(actions.getPage('artist', `${url}/${id}`, directDataMapper));
    }
}

export let playArtistById = (id) => {
    return (dispatch, getState) => {
        dispatch(actions.getPageAndDispatch(`${url}/${id}`, playerActions.setSongs, artistToArrayMapper));
    }
}

export let addArtistById = (id) => {
    return (dispatch, getState) => {
        dispatch(actions.getPageAndDispatch(`${url}/${id}`, playerActions.addSongs, artistToArrayMapper));
    }
}

export let addNextArtistById = (id) => {
    return (dispatch, getState) => {
        dispatch(actions.getPageAndDispatch(`${url}/${id}`, playerActions.addPlayNext, artistToArrayMapper));
    }
}