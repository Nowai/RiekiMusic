import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

// components
import ListView from 'listView/ListView';
import LoadingIndicator from '../components/LoadingIndicator';
import CardList from '../components/cardView/CardList';

// actions
import * as actions from 'actions/dataActions';

// mui
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ActionViewModel from 'material-ui/svg-icons/action/view-module';
import ActionViewHeadline from 'material-ui/svg-icons/action/view-headline';

export class SongListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cardView: true 
        };
    }

    componentDidMount = () => {
        if(!(this.props.items && this.props.items.length)) {
            this.props.dispatch(actions.getPage('songs', 'http://localhost:8080/songs', this.dataMapper));   
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
        const el = document.getElementById('songlistview');
        if(el.getBoundingClientRect().bottom <= window.innerHeight) {
            if(!this.props.isFetching)
                this.props.dispatch(actions.getNextPage('songs', this.dataMapper));
        }
    }

    dataMapper = (data) => {
        let songs = data.songs;
        let mappedData = { next_url: data.next_href};
        mappedData.data = songs.map((song) => {
            return {
                avatar: song.cover_url != '' ? 'http://localhost:8080' + song.cover_url : 'default',
                primaryText: song.title,
                secondaryText: song.artist,
                clickHandler: (e) => {e.preventDefault(); this.props.dispatch(actions.setSongs([{
                    songId: song.songId,
                    title: song.title,
                    artist: song.artist,
                    artistId: song.artistId
                }],0))},
                menu: [{text:'Goto Artist', onClick: (e) => { e.preventDefault(); this.props.history.push('/artists/' + song.artistId)}},
                        {text:'Goto Album', onClick: (e) => { e.preventDefault(); this.props.history.push('/albums/' + song.albumId)}}]
            };         
        });
        return mappedData;
    }

    getInfoRender = () => {
        return this.props.isFetching ? (<LoadingIndicator isLoading={true}></LoadingIndicator>) : (<div></div>);
    }

    getViewIcon = () => {
        if(this.state.cardView) {
            return (
                <IconButton onClick={this.handleViewClick}>
                    <ActionViewHeadline></ActionViewHeadline>
                </IconButton>
            );
        }
        else {
            return (
                <IconButton onClick={this.handleViewClick}>
                    <ActionViewModel></ActionViewModel>
                </IconButton>
            );
        }
    }

    getViewRender = () => {
        if(!this.state.cardView) {
            return (
                <ListView items={this.props.items}></ListView>
            );
        }
        else {
            return (
                <CardList items={this.props.items}></CardList>
            );
        }
    }

    handleViewClick = (e) => {
        e.preventDefault();
        this.setState({
            cardView: !this.state.cardView
        });
    }

    getMainRender = () => {
        if(this.props.items && this.props.items.length) {
            return (<div id="songlistview">
                <div className="header-container">
                <h2>Songs</h2>
                {this.getViewIcon()}
                </div>
                <Divider></Divider>
                {this.getViewRender()}
            </div>);
        }
        return (
            <div id="songlistview">
                <h2>Songs</h2>
                {this.getInfoRender()}
            </div>
        );
    }

    render = () => {
        const mainRender = this.getMainRender();
        return (
            <div>
                {mainRender}
            </div>
        );
    }

};

export default connect(
    (state) => {
        return state.data.songs ? state.data.songs : {};
    }
)(SongListView);