import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

// components
import ListView from 'listView/ListView';
import LoadingIndicator from '../components/LoadingIndicator';

// actions
import * as actions from 'actions/dataActions';

// mui
import Divider from 'material-ui/Divider';

export class ArtistListView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        if(!(this.props.items && this.props.items.length)) {
            this.props.dispatch(actions.getPage('artists', 'http://localhost:8080/artists', this.dataMapper));   
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
        const el = document.getElementById('artistlistview');
        if(el.getBoundingClientRect().bottom <= window.innerHeight) {
            if(!this.props.isFetching)
                this.props.dispatch(actions.getNextPage('artists', this.dataMapper));
        }
    }

    dataMapper = (data) => {
        let artists = data.artists;
        let mappedData = { next_url: data.next_href};
        mappedData.data = artists.map((datum) => {
            return {
                primaryText: datum.artist,
                secondaryText: datum.songCount + (datum.songCount > 1 ? ' songs in ': ' song in ') + datum.albumCount + (datum.albumCount > 1 ? ' albums' : ' album'),
                avatar:datum.cover_url != '' ? 'http://localhost:8080' + datum.cover_url : 'default',
                clickHandler: (e) =>{ e.preventDefault(); this.props.history.push('/artists/' + datum.id)},
                menu: [{text:'menu', onClick:(e)=> {console.log('test')}}]
            };
        });
        return mappedData;
    }

    getInfoRender = () => {
        return this.props.isFetching ? (<LoadingIndicator isLoading={true}></LoadingIndicator>) : (<div></div>);
    }

    getDataRender = () => {
        if(this.props.items && this.props.items.length) {
            return (<div id="artistlistview">
                <h2>Artists</h2>
                <Divider></Divider>
                <ListView items={this.props.items}></ListView>
            </div>);
        }
        return (
            <div id="artistlistview">
                <h2>Artists</h2>
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
};

export default withRouter(connect(
    (state) => {
        return state.data.artists ? state.data.artists : {};
    }
)(ArtistListView));