import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

export class PlayerSongWidget extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubtitleClick = (e) => {
        e.preventDefault();
        console.log(this.props);
        this.props.history.push(`/artists/${this.props.artistId}`);
    }

    render = () => {
        if(!this.props.artistId) {
            return (<div className="playersongwidget-wrapper"></div>);
        } else {
            return (
                <div className="playersongwidget-wrapper">
                    <div className="playersongwidget-cover">
                        <img src={this.props.cover_url} alt=""/> 
                    </div>
                    <div className="playersongwidget-text">
                        <div className="playersongwidget-text-title">{this.props.title}</div>
                        <div className="playersongwidget-text-subtitle" onClick={this.handleSubtitleClick}>{this.props.artist}</div> 
                    </div>
                </div>
            );
        }
    }
}

export default withRouter(connect(
    (state) => {
        return state.player.currentSong;
    }
)(PlayerSongWidget));