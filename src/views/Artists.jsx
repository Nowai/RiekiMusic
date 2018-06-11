import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

// actions
import * as actions from 'actions/ArtistsActions';
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

export class Artists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selection: 'cards'
        };
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

    getCards = () => {
        if(!this.props.items)
            return (null);
        return this.props.items.map((artist, index) => {
            return (
                <Card
                    key={index}
                    primaryText={artist.artist}
                    primaryAction={(e) => {this.props.history.push(`/artists/${artist.artistId}`)}}
                    secondaryText={`${artist.songCount} songs in ${artist.albumCount} albums`}
                    imgsrc={artist.cover_url}
                >
                    <div></div>
                    <IconButton onClick={() => {this.props.dispatch(actions.playArtistById(artist.artistId))}}>
                        <AvPlayArrow />
                    </IconButton>
                    {this.getMoreMenu(artist)}
                </Card>
            )
        });
    }

    getListRows = () => {
        if(!this.props.items)
            return (null);
        return this.props.items.map((artist, index) => {
            return (
                <ListRow key={index}>
                    <ListRowLeft>
                        <ListCover src={artist.cover_url} onClick={() => {this.props.dispatch(actions.playArtistById(artist.artistId))}}></ListCover>
                    </ListRowLeft>
                    <ListRowCenter>
                        <ListElement text={artist.artist} onClick={() => {this.props.history.push(`/artists/${artist.artistId}`)}}/>
                        <ListElement text={`${artist.songCount} songs`}/>
                        <ListElement text={`${artist.albumCount} albums`}/>
                    </ListRowCenter>
                    <ListRowRight>
                        {this.getMoreMenu(artist)}
                    </ListRowRight>
                </ListRow>   
            )
        });
    }

    getMoreMenu = (artist) => {
        return (
            <MoreMenu>
                <GotoMenuItem label='Go to artist' destination={`/artists/${artist.artistId}`}/>
                <ActionMenuItem label='Play artist' action={() => {return actions.playArtistById(artist.artistId)}}/>
                <ActionMenuItem label='Play artist next' action={() => {return actions.addNextArtistById(artist.artistId)}}/>
                <ActionMenuItem label='Queue artist' action={() => {return actions.addArtistById(artist.artistId)}}/>
            </MoreMenu>
        )
    }

    getSelectedView = () => {
        if(this.state.selection === 'cards') {
            return (
                <CardView>
                    {this.getCards()}
                </CardView>
            )
        }
        else if(this.state.selection === 'list') {
            return (
                <List>
                    {this.getListRows()}
                </List>
            )
        }
    }

    render = () => {
        return (
            <div>
                <ViewToggle onSelect={this.handleViewSelection}>
                    <ViewTitle>Artists</ViewTitle>
                </ViewToggle>
                <ScrollLoader onTrigger={this.handleLoadTrigger} isEnabled={!this.props.isFetching}>
                    {this.getSelectedView()}
                    <LoadingIndicator isLoading={this.props.isFetching}/>
                </ScrollLoader>
            </div>
        );
    }
}

export default withRouter(connect(
    (state) => {
        return state.data.artists ? state.data.artists : { isFetching: false };
    }
)(Artists));