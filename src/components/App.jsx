import React from 'react';
import {connect} from 'react-redux';
import {HashRouter as Router} from 'react-router-dom';

// components
import MasterLayout from 'MasterLayout';
import PlayerBar from 'PlayerBar';

export class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <Router>
                <div className="app">
                    <MasterLayout></MasterLayout>
                    <PlayerBar></PlayerBar>
                </div>
            </Router>
        );
    }
}

module.exports = App;
