import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// components
import ListView from 'listView/ListView';
import LoadingIndicator from '../components/LoadingIndicator';

// actions
import * as actions from 'actions/dataActions';

// mui
import Divider from 'material-ui/Divider';

export class AlbumListView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        if(!(this.props.items && this.props.items.length)) {
            this.props.dispatch(actions.getPage('albums', 'http://localhost:8080/albums', this.dataMapper));   
        }
        this.mountScrollLoading();
    }

    componentWillUnmount = () => {
        this.unmountScrollLoading();
    }

    mountScrollLoading = () => {
        document.addEventListener('scroll', this.handleScroll);
    }

    unmountScrollLoading = () => {
        document.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        const el = document.getElementById('albumlistview');
        if(el.getBoundingClientRect().bottom <= window.innerHeight) {
            if(!this.props.isFetching)
                this.props.dispatch(actions.getNextPage('albums', this.dataMapper));
        }
    }

    dataMapper = (data) => {
        let albums = data.albums;
        let mappedData = {next_url: data.next_href};
        mappedData.data = albums.map((datum) => {
            return {
                primaryText: datum.albumTitle + ' by ' + datum.artistName,
                secondaryText: datum.songCount + ' songs',
                avatar: datum.cover_url != '' ? 'http://localhost:8080' + datum.cover_url : 'default',
                clickHandler: (e) => {e.preventDefault(); this.props.history.push('/albums/' + datum.albumId)},
                menu: [{text: 'Goto', onClick:(e) => {console.log('menu click')}}]
            }
        });
        return mappedData;
    }

    getInfoRender = () => {
        return this.props.isFetching ? (<LoadingIndicator isLoading={true}></LoadingIndicator>) : (<div></div>);
    }

    getDataRender = () => {
        if(this.props.items && this.props.items.length) {
            return (<div id="albumlistview">
                <h2>Albums</h2>
                <Divider></Divider>
                <ListView items={this.props.items}></ListView>
            </div>);
        }
        return (
            <div id="albumlistview">
                <h2>Albums</h2>
            </div>
        );
    }

    render = () => {
        const dataRender = this.getDataRender();
        const infoRender = this.getInfoRender();
        return (
            <div>
                {dataRender}
                {infoRender}
            </div>
        );
    }
}

export default connect(
    (state) => {
        return state.data.albums ? state.data.albums : {};
    }
)(AlbumListView);