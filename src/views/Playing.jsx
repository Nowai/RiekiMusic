import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

// components
import ViewTitle from 'components/ViewTitle';
import List from 'components/listView/List';
import ListCover from 'components/listView/ListCover';
import ListElement from 'components/listView/ListElement';
import ListRow from 'components/listView/ListRow';
import ListRowCenter from 'components/listView/ListRowCenter';
import ListRowLeft from 'components/listView/ListRowLeft';
import ListRowRight from 'components/listView/ListRowRight';
import MoreMenu from 'components/moreMenu/MoreMenu';
import GotoMenuItem from 'components/moreMenu/GotoMenuItem';
import ActionMenuItem from 'components/moreMenu/ActionMenuItem';

// utils
import {durationToString} from 'utils/Utils';

// actions
import * as playerActions from 'actions/PlayerActions';

export class Playing extends React.Component {
    constructor(props) {
        super(props);
    }

    getHistoryMoreMenu = (song,index) => {
        return (
            <MoreMenu>
                <ActionMenuItem label='Remove from playlist' action={() => {return playerActions.removeFromHistory(index)}}/>
            </MoreMenu>
        );
    }

    getFutureMoreMenu = (song,index) => {
        return (
            <MoreMenu>
                <ActionMenuItem label='Remove from playlist' action={() => {return playerActions.removeFromFuture(index)}}/>
            </MoreMenu>
        );
    }
    
    getNextMoreMenu = (song,index) => {
        return (
            <MoreMenu>
                <ActionMenuItem label='Remove from playlist' action={() => {return playerActions.removeFromPlayNext(index)}}/>
            </MoreMenu>
        );
    }
    
    generatePrevious = () => {
        if(this.props.previous) {
            return this.props.previous.map((song, index) => {
                return (
                    <ListRow key={index}>
                        <ListRowLeft>
                            <ListCover src={song.cover_url}/>
                        </ListRowLeft>
                        <ListRowCenter>
                            <ListElement text={song.title}/>
                            <ListElement text={song.artist} onClick={() => {this.props.history.push(`/artists/${song.artistId}`)}}/>
                            <ListElement text={song.album} onClick={() => {this.props.history.push(`/albums/${song.albumId}`)}}/>
                        </ListRowCenter>
                        <ListRowRight text={`${durationToString(song.duration)}`} isLikeable={false}>
                            {this.getHistoryMoreMenu(song, index)}
                        </ListRowRight>
                    </ListRow>
                )
            });
        } else {
            return (null);
        }
    }

    generateCurrent = () => {
        if(this.props.currentSong) {
            return (
                <ListRow isActive={true}>
                    <ListRowLeft>
                        <ListCover src={this.props.currentSong.cover_url}/>
                    </ListRowLeft>
                    <ListRowCenter>
                        <ListElement text={this.props.currentSong.title}/>
                        <ListElement text={this.props.currentSong.artist} onClick={() => {this.props.history.push(`/artists/${this.props.currentSong.artistId}`)}}/>
                        <ListElement text={this.props.currentSong.album} onClick={() => {this.props.history.push(`/albums/${this.props.currentSong.albumId}`)}}/>
                    </ListRowCenter>
                    <ListRowRight text={`${durationToString(this.props.currentSong.duration)}`} isLikeable={false}>

                    </ListRowRight>
                </ListRow>
            )
        } else {
            return (null);
        }
    }

    generateNext = () => {
        if(this.props.playNext) {
            return this.props.playNext.map((song, index) => {
                return (
                    <ListRow key={index}>
                        <ListRowLeft>
                            <ListCover src={song.cover_url}/>
                        </ListRowLeft>
                        <ListRowCenter>
                            <ListElement text={song.title}/>
                            <ListElement text={song.artist} onClick={() => {this.props.history.push(`/artists/${song.artistId}`)}}/>
                            <ListElement text={song.album }onClick={() => {this.props.history.push(`/albums/${song.albumId}`)}}/>
                        </ListRowCenter>
                        <ListRowRight text={`${durationToString(song.duration)}`} isLikeable={false}>
                            {this.getNextMoreMenu(song, index)} 
                        </ListRowRight>
                    </ListRow>
            )});
        } else {
            return (null);
        }
    }

    generateFuture = () => {
        if(this.props.future) {
            return this.props.future.map((song, index) => {
                return (
                    <ListRow key={index}>
                        <ListRowLeft>
                            <ListCover src={song.cover_url}/>
                        </ListRowLeft>
                        <ListRowCenter>
                            <ListElement text={song.title}/>
                            <ListElement text={song.artist} onClick={() => {this.props.history.push(`/artists/${song.artistId}`)}}/>
                            <ListElement text={song.album} onClick={() => {this.props.history.push(`/albums/${song.albumId}`)}}/>
                        </ListRowCenter>
                        <ListRowRight text={`${durationToString(song.duration)}`} isLikeable={false}>
                            {this.getFutureMoreMenu(song, index)} 
                        </ListRowRight>
                    </ListRow>   
                )
            })
        } else {
            return (null);
        }

    }

    render = () => {
        return (
            <div>
                <ViewTitle>Currently Playing</ViewTitle>
                <List>
                    {this.generatePrevious()}
                    {this.generateCurrent()}
                    {this.generateNext()}
                    {this.generateFuture()}
                </List>
            </div>
        );
    }
}

export default withRouter(connect(
    (state) => {
        return {
            currentSong: state.player.currentSong,
            future: state.player.future,
            previous: state.player.history,
            playNext: state.player.playNext
        }
    }
)(Playing));