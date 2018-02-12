import axios from 'axios';

export let dataRequest = (store) => {
    return {
        type: 'DATA_REQUEST',
        store
    }
}

export let dataSucReceive = (store, data) => {
    return {
        type: 'DATA_SUC_RECEIVE',
        store,
        ...data
    }
}

export let dataErrReceive = (store, error) => {
    return {
        type: 'DATA_ERR_RECEIVE',
        store,
        error
    }
}

const defaultMapper = (a) => a;

export let getPage = (store, url, dataMapper=defaultMapper) => {
    return (dispatch, getState) => {
        // we are loading async data
        dispatch(dataRequest(store));

        return axios.get(url).then((response) => {
            dispatch(dataSucReceive(store, dataMapper(response.data)));
        }).catch((error) => {
            let errorMsg = 'request error';
            if(error.response)
                errorMsg = error.status;
            else if(error.request)
                errorMsg = 'no response from server';
            dispatch(dataErrReceive(store, errorMsg))
        });
    }
}

export let getNextPage = (store, dataMapper=defaultMapper) => {
    return (dispatch,getState) => {
        const url = getState().data[store].next_href;
        return getPage(store, url, dataMapper)(dispatch, getState);
    }
}