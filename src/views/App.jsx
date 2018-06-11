import React from 'react';
import {connect} from 'react-redux';
import {HashRouter as Router} from 'react-router-dom';

// components
//import MasterLayout from 'MasterLayout';
import Body from 'views/Body';
import PlayerBar from 'components/PlayerBar';

export class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <Router>
                <div className="app">
                    <Body></Body>
                    <PlayerBar></PlayerBar>
                </div>
            </Router>
        );
    }
}

module.exports = App;
