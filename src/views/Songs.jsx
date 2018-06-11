import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

// actions
import * as actions from 'actions/SongsActions';
import * as playerActions from 'actions/PlayerActions';

// components
import ScrollLoader from 'ScrollLoader';
import CardView from 'components/cardView/CardView';
import Card from 'components/cardView/Card';
import ViewTitle from 'components/ViewTitle';
import ViewToggle from 'components/ViewToggle';
import LoadingIndicator from 'components/LoadingIndicator';
import List from 'components/listView/List';
import ListElement from 'components/listView/ListElement';
import ListRow from 'components/listView/ListRow';
import ListRowCenter from 'components/listView/ListRowCenter';
import ListRowLeft from 'components/listView/ListRowLeft';
import ListRowRight from 'components/listView/ListRowRight';
import ListCover from 'components/listView/ListCover';
import MoreMenu from 'components/moreMenu/MoreMenu';
import ActionMenuItem from 'components/moreMenu/ActionMenuItem';
import GotoMenuItem from 'components/moreMenu/GotoMenuItem';

// utils
import {durationToString} from 'utils/Utils';

// mio
import IconButton from 'material-ui/IconButton';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';

export class Songs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selection: 'cards'
        }
    }

    componentDidMount = () => {
        if(!this.props.items)
            this.props.dispatch(actions.getPage());
    }

    handleLoadTrigger = () => {
        this.props.dispatch(actions.getNextPage());
    }

    getSongMoreMenu = (song) => {
        return (
            <MoreMenu>
                <ActionMenuItem label='Play next' action={() => {return playerActions.addPlayNext([song])}} />
                <ActionMenuItem label='Add to queue' action={() => {return playerActions.addSongs([song])}} />
                <GotoMenuItem label='Go to artist' destination={`/artists/${song.artistId}`}></GotoMenuItem>
                <GotoMenuItem label='Go to album' destination={`/albums/${song.albumId}`}></GotoMenuItem>
            </MoreMenu>
        );
    }

    handleViewSelection = (selection) => {
        this.setState({selection});
    }

    getCards = () => {
        if(!this.props.items)
            return (null);
        return this.props.items.map((song, index) => {
            return (
                <Card 
                    key={index} 
                    primaryText={song.title}
                    secondaryText={song.artist} 
                    secondaryAction={(e) =>{this.props.history.push(`/artists/${song.artistId}`)}}
                    imgsrc={song.cover_url}>
                        <IconButton>
                            <ActionFavorite></ActionFavorite>
                        </IconButton>
                        <IconButton onClick={() => {this.props.dispatch(playerActions.setSongs(this.props.items, index))}}>
                            <AvPlayArrow />
                        </IconButton>
                        {this.getSongMoreMenu(song)}
                </Card>
            )
        })
    }

    getListRows = () => {
        if(!this.props.items)
            return (null);
        return this.props.items.map((song, index) => {
            return (
                <ListRow key={index}>
                    <ListRowLeft>
                        <ListCover onClick={() => {this.props.dispatch(playerActions.setSongs(this.props.items, index))}} src={song.cover_url}></ListCover>
                    </ListRowLeft>
                    <ListRowCenter>
                        <ListElement text={song.title}/>
                        <ListElement onClick={() => {this.props.history.push(`/artists/${song.artistId}`)}} text={song.artist}/>
                        <ListElement onClick={() => {this.props.history.push(`/albums/${song.albumId}`)}} text={song.album}/>
                    </ListRowCenter>
                    <ListRowRight text={`${durationToString(song.duration)}`} isLikeable={true}>
                        {this.getSongMoreMenu(song)}
                    </ListRowRight>
                </ListRow>   
            )
        });
    }

    getSelectedView = () => {
        if(this.state.selection === 'cards') {
            return (
                <CardView>
                    {this.getCards()}
                </CardView>
            );
        }
        else if(this.state.selection === 'list') {
            return (
                <List>
                    {this.getListRows()}
                </List>
            );
        }
    }

    render = () => {
        return (
            <div>
                <ViewToggle onSelect={this.handleViewSelection}>
                    <ViewTitle>Songs</ViewTitle>
                </ViewToggle> 
                <ScrollLoader onTrigger={this.handleLoadTrigger} isEnabled={!this.props.isFetching}>
                    {this.getSelectedView()}
                    <LoadingIndicator isLoading={this.props.isFetching}></LoadingIndicator>
                </ScrollLoader>
            </div>
        );
    }
}

export default withRouter(connect(
    (state) => {
        return state.data.songs ? state.data.songs : { isFetching: false };
    }
)(Songs));