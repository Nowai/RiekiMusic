import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

// components
import ViewTitle from 'components/ViewTitle';
import CardHeader from 'components/CardHeader';
import LoadingIndicator from 'components/LoadingIndicator';
import List from 'components/listView/List';
import ListElement from 'components/listView/ListElement';
import ListRow from 'components/listView/ListRow';
import ListRowCenter from 'components/listView/ListRowCenter';
import ListRowLeft from 'components/listView/ListRowLeft';
import ListRowRight from 'components/listView/ListRowRight';
import MoreMenu from 'components/moreMenu/MoreMenu';
import GotoMenuItem from 'components/moreMenu/GotoMenuItem';
import ActionMenuItem from 'components/moreMenu/ActionMenuItem';

// actions
import * as actions from 'actions/AlbumsActions';
import * as playerActions from 'actions/PlayerActions';

// utils
import {durationToString} from 'utils/Utils';

export class Album extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        if(!this.props.items || this.props.items.albumId != this.props.match.params.id)
            this.props.dispatch(actions.getPageById(this.props.match.params.id || 1));
    }

    handleArtistClick = (artistId) => {
        this.props.history.push(`/artists/${artistId}`);
    }

    getLoadedView = () => {
        return (
            <div>
                <CardHeader title={this.props.items.albumTitle}
                    cover={this.props.items.songs[0].cover_url}
                    subtitle={this.props.items.artistName}
                    onSubtitleClick={() => {this.props.history.push(`/artists/${this.props.items.artistId}`)}}
                    count={this.props.items.songs.length}/>
                <List>
                    {this.props.items.songs.map((song, index) => {
                        return (
                            <ListRow key={index}>
                                <ListRowLeft>{index+1}</ListRowLeft>
                                <ListRowCenter>
                                    <ListElement onClick={() => {this.props.dispatch(playerActions.setSongs(this.props.items.songs, index))}} text={song.title}/>
                                </ListRowCenter>
                                <ListRowRight text={`${durationToString(song.duration)}`} isLikeable={false}>
                                    <MoreMenu>
                                        <GotoMenuItem label='Go to artist' destination={`/artists/${song.artistId}`}></GotoMenuItem>
                                        <ActionMenuItem label='Add song to queue' action={() => {return playerActions.addSongs([song])}}></ActionMenuItem>
                                        <ActionMenuItem label='Play song next' action={() => {return playerActions.addPlayNext([song])}}></ActionMenuItem>
                                    </MoreMenu>
                                </ListRowRight>
                            </ListRow>
                        )
                    })}
                </List>
            </div>);
    }

    render = () => {
        return (
            <div>
                <ViewTitle>Album</ViewTitle>
                {this.props.items ? this.getLoadedView() : (null)}
                <LoadingIndicator isLoading={this.props.isFetching}></LoadingIndicator>
            </div>   
        );
    }
}

export default withRouter(connect(
    (state) => {
        return state.data.album ? state.data.album : { isFetching: false}
    }
)(Album));