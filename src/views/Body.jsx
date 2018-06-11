import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom'; 
import {withRouter} from 'react-router-dom'; 

// components
import LeftMenu from 'components/leftMenu/LeftMenu';
import LayoutContainer from 'components/LayoutContainer';

// views
import TestView from 'views/TestView';
import Songs from 'views/Songs';
import Artists from 'views/Artists';
import Artist from 'views/Artist';
import Albums from 'views/Albums';
import Album from 'views/Album';
import Playing from 'views/Playing';

export class Body extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div className="content-body">
                <LeftMenu></LeftMenu>
                <LayoutContainer>
                    <Switch>
                        <Route exact path="/" component={Songs}></Route>
                        <Route exact path="/songs" component={Songs}></Route>
                        <Route exact path="/albums" component={Albums}></Route>
                        <Route exact path="/playing" component={Playing}></Route>
                        <Route path="/albums/:id" component={Album}></Route>
                        <Route exact path="/artists" component={Artists}></Route>
                        <Route path="/artists/:id" component={Artist}></Route>
                        <Route path="/Test" component={TestView}></Route>
                    </Switch>
                </LayoutContainer>
            </div>
        );
    }
}

export default Body;
