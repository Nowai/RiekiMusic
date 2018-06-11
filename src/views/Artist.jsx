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
import BlockFiller from 'components/BlockFiller';

// actions
import * as actions from 'actions/ArtistsActions';
import * as playerActions from 'actions/PlayerActions';

// utils
import { durationToString } from 'utils/Utils';

export class Artist extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        if(!this.props.items || this.props.items.albumId != this.props.match.params.id)
            this.props.dispatch(actions.getPageById(this.props.match.params.id || 1));
    }

    handleArtistClick = () => {

    }

    getLoadedView = () => {
        return (
            <div>
                {this.props.items.albums.map((album, aIndex) => {
                    return (
                        <div key={aIndex}>
                            <CardHeader title={album.albumTitle}
                                cover={album.songs[0].cover_url}
                                subtitle={album.artistName}
                                onSubtitleClick={this.handleArtistClick}
                                count={album.songs.length}/>
                            <List>
                                {album.songs.map((song, index) => {
                                    return (
                                        <ListRow key={index}>
                                            <ListRowLeft>{index+1}</ListRowLeft>
                                            <ListRowCenter>
                                                <ListElement text={song.title} onClick={() => {this.props.dispatch(playerActions.setSongs(album.songs, index))}}/>
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
                            <BlockFiller/>
                        </div>
                    )
                })}
            </div>
        );
    }

    render = () => {
        return (
            <div>
                <ViewTitle>Artist</ViewTitle>
                {this.props.items ? this.getLoadedView() : (null)}
                <LoadingIndicator isLoading={this.props.isFetching}></LoadingIndicator>
            </div>
        );
    }
}

export default withRouter(connect(
    (state) => {
        return state.data.artist ? state.data.artist : { isFetching: false}
    }
)(Artist));