import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

// actions
import * as actions from 'actions/AlbumsActions';
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

// mio
import IconButton from 'material-ui/IconButton';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';

export class Albums extends React.Component {
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

    handleViewSelection = (selection) => {
        this.setState({selection});
    }

    getMoreMenu = (album) => {
        return (
            <MoreMenu>
                <GotoMenuItem label='Go to album' destination={`/albums/${album.albumId}`}></GotoMenuItem>
                <ActionMenuItem label='Play album' action={() => {return actions.playAlbumById(album.albumId)}}/>
                <ActionMenuItem label='Play album next' action={() => {return actions.addNextAlbumById(album.albumId)}}/>
                <ActionMenuItem label='Queue album' action={() => {return actions.addAlbumById(album.albumId)}}/>
            </MoreMenu>
        );
    }

    handleViewSelection = (selection) => {
        this.setState({selection});
    }

    getCards = () => {
        if(!this.props.items)
            return (null);
        return this.props.items.map((album, index) => {
            return (
                <Card 
                    key={index} 
                    primaryText={album.albumTitle}
                    primaryAction={(e) => {this.props.history.push(`/albums/${album.albumId}`)}}
                    secondaryText={album.artistName} 
                    secondaryAction={(e) =>{this.props.history.push(`/artists/${album.artistId}`)}}
                    imgsrc={album.cover_url}>
                        <div></div>
                        <IconButton onClick={() => {this.props.dispatch(actions.playAlbumById(album.albumId))}}>
                            <AvPlayArrow />
                        </IconButton>
                        {this.getMoreMenu(album)}
                </Card>
            )
        })
    }

    getListRows = () => {
        if(!this.props.items)
            return (null);
        return this.props.items.map((album, index) => {
            return (
                <ListRow key={index}>
                    <ListRowLeft>
                        <ListCover onClick={() => {this.props.dispatch(actions.playAlbumById(album.albumId))}} src={album.cover_url}></ListCover>
                    </ListRowLeft>
                    <ListRowCenter>
                        <ListElement onClick={() => {this.props.history.push(`/albums/${album.albumId}`)}} text={album.albumTitle}/>
                        <ListElement onClick={() => {this.props.history.push(`/artists/${album.artistId}`)}} text={album.artistName}/>
                        <ListElement text={`${album.songCount} songs`}/>
                    </ListRowCenter>
                    <ListRowRight text='' isLikeable={false}>
                        {this.getMoreMenu(album)}
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
                    <ViewTitle>Albums</ViewTitle>
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
        return state.data.albums ? state.data.albums : { isFetching: false };
    }
)(Albums));