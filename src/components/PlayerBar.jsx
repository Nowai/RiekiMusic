import React from 'react';
import {connect} from 'react-redux';

// actions
import * as actions from 'actions/playerActions';

// mui
import muiThemeable from 'material-ui/styles/muiThemeable';
import IconButton from 'material-ui/IconButton';
import Slider from 'material-ui/Slider';
import AvSkipPrevious from 'material-ui/svg-icons/av/skip-previous';
import AvSkipNext from 'material-ui/svg-icons/av/skip-next';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';
import AvPause from 'material-ui/svg-icons/av/pause';
import AvShuffle from 'material-ui/svg-icons/av/shuffle';
import AvRepeat from 'material-ui/svg-icons/av/repeat';
import AvVolumeUp from 'material-ui/svg-icons/av/volume-up';
import AvVolumeDown from 'material-ui/svg-icons/av/volume-down';
import AvVolumeOff from 'material-ui/svg-icons/av/volume-off';


export class PlayerBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            progress: 0,
            timer: null
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if(!this.props.player.isPlaying && nextProps.player.isPlaying) {
            this.setState(Object.assign({}, this.state, {
                progress: 0,
                timer: setInterval(() => { this.setState(Object.assign({}, this.state, {progress: (this.state.progress+1.0)}))}, 1000)
            }));
        }
        if(this.props.player.isPlaying && !nextProps.player.isPlaying) {
            clearInterval(this.state.timer);
            this.setState(Object.assign({}, this.state, {
                progress: 0,
                timer: null
            }));
        }
    }

    getStyle = () => {
        return {
            backgroundColor: this.props.muiTheme.palette.primary1Color
        };
    }

    getPlayingIcon = () => {
        return this.props.player.isPlaying ? <AvPause/> : <AvPlayArrow/>;
    }

    getActiveColor = (b) => {
        // TODO: fix styling to use global style and not be hardcoded!
        return b ? 'white' : 'black'
    }

    getVolumeIcon = () => {
        if(this.props.volume==0) 
            return <AvVolumeOff/>;
        else if(this.props.volume<50)
            return <AvVolumeDown/>;
        else
            return <AvVolumeUp/>;
    }

    getProgress = () => {
        return this.props.player.howl != null ? (this.state.progress / this.props.player.howl.duration()) * 100.0 : 0.0;
    }

    handlePreviousClick = (e) => {
        e.preventDefault();
        this.props.dispatch(actions.playPrevious());
    }
    
    handlePlayClick = (e) => {
        e.preventDefault();
        this.props.dispatch(actions.togglePlay());
    }

    handleNextClick = (e) => {
        e.preventDefault();
        this.props.dispatch(actions.playNext());
    }

    handleVolumeClick = (e) => {
        e.preventDefault();
    }

    handleShuffleClick = (e) => {
        e.preventDefault();
        this.props.dispatch(actions.toggleShuffle());
    }

    handleRepeatClick = (e) => {
        e.preventDefault();
        this.props.dispatch(actions.toggleRepeat());
    }

    render = () => {
        const style = this.getStyle();
        const repeatActiveStyle = this.getActiveColor(this.props.player.repeat);
        const shuffleActiveStyle = this.getActiveColor(this.props.player.shuffle);
        const playingIcon = this.getPlayingIcon();
        const volumeIcon = this.getVolumeIcon();
        const progress = this.getProgress();
        return (
            <div className="playerbar-container" style={style}>
                <div className="playerbar-left">
                    <IconButton onClick={this.handlePreviousClick}><AvSkipPrevious/></IconButton>
                    <IconButton onClick={this.handlePlayClick}>{playingIcon}</IconButton>
                    <IconButton onClick={this.handleNextClick}><AvSkipNext/></IconButton>
                </div>
                <div className="playerbar-center">
                    <Slider min={0} max={100} value={progress}></Slider>
                </div>
                <div className="playerbar-right">
                    <IconButton onClick={this.handleVolumeClick}>{volumeIcon}</IconButton>
                    <IconButton onClick={this.handleShuffleClick}><AvShuffle color={shuffleActiveStyle}/></IconButton>
                    <IconButton onClick={this.handleRepeatClick}><AvRepeat color={repeatActiveStyle}/></IconButton>
                </div>
            </div>
        );
    }
};

export default muiThemeable()(connect(
    (state) => {
        return state;
    }
)(PlayerBar));