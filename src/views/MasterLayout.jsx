import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import {HashRouter as Router} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

// components
import HeaderBar from 'HeaderBar';
import LeftDrawer from 'leftDrawer/LeftDrawer';
import RightDrawer from 'rightDrawer/RightDrawer';
import Panel from 'Panel';
import LayoutContainer from 'LayoutContainer';

// views
import ArtistView from 'views/ArtistView';
import ArtistListView from 'views/ArtistListView';
import AlbumListView from 'views/AlbumListView';
import AlbumView from 'views/AlbumView';
import SongListView from 'views/SongListView';

export class MasterLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
                <div style={{flex:1}}>
                    <LeftDrawer></LeftDrawer>
                    <RightDrawer></RightDrawer>
                    <Panel>
                        <HeaderBar></HeaderBar>
                        <LayoutContainer>
                            <div>
                                <Switch>
                                    <Route exact path="/" component={SongListView}></Route>
                                    <Route exact path="/songs" component={SongListView}></Route>
                                    <Route exact path="/albums" component={AlbumListView}></Route>
                                    <Route path="/albums/:id" component={AlbumView}></Route>
                                    <Route exact path="/artists" component={ArtistListView}></Route>
                                    <Route path="/artists/:id" component={ArtistView}></Route>
                                </Switch>
                            </div>
                        </LayoutContainer>
                    </Panel>
                </div>
        );
    }

};

export default withRouter(connect(
    (state) => {
        return state;
    }
)(MasterLayout));