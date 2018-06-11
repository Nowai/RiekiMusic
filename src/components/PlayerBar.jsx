import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

// actions
import * as actions from 'actions/PlayerActions';

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
import AvQueueMusic from 'material-ui/svg-icons/av/queue-music';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';

// components
import ReactHowler from 'react-howler';
import PlayerSongWidget from 'components/PlayerSongWidget';
import {colors} from 'components/Colors';

export class PlayerBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            progress: 1.0,
            timer: null,
            playing: false,
            open: false,
            anchorEl: null,
            volume: 0.5
        }
    }

    componentWillReceiveProps = (nextProps) => {
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
        return b ? colors.palette.accent1Color : colors.palette.textColor;
    }

    getVolumeIcon = () => {
        if(this.state.volume==0) 
            return <AvVolumeOff/>;
        else if(this.state.volume<0.5)
            return <AvVolumeDown/>;
        else
            return <AvVolumeUp/>;
    }

    getProgress = () => {
        if(typeof this.player !== 'undefined') {
            let progress = (this.state.progress/this.player.duration()) * 100.0 || .1;
            if(progress > 100) 
                progress = 100.0;
            else if(progress < 0)
                progress = .1;
            return progress;
        }
        return .1;
    }

    handlePreviousClick = (e) => {
        e.preventDefault();
        this.props.dispatch(actions.previous());
    }
    
    handlePlayClick = (e) => {
        e.preventDefault();
        if(!this.props.player.isPlaying)
            this.props.dispatch(actions.play());
        if(this.props.player.isPlaying)
            this.props.dispatch(actions.pause());
    }

    handleNextClick = (e) => {
        e.preventDefault();
        this.props.dispatch(actions.next());
    }

    handleVolumeClick = (e) => {
        e.preventDefault();
        if(!this.state.open) {
            this.setState({
                open: true,
                anchorEl: e.currentTarget
            });
        } else {
            this.handleRequestClose();
        }
    }

    handleRequestClose = () => {
        this.setState({
            open: false
        });
    }

    handleVolume = (e, value) => {
        this.setState({
            volume: value
        });
    }

    handleShuffleClick = (e) => {
        e.preventDefault();
        this.props.dispatch(actions.toggleShuffle());
    }

    handleRepeatClick = (e) => {
        e.preventDefault();
        this.props.dispatch(actions.toggleRepeat());
    }

    handlePlay = () => {
        this.setState(Object.assign({}, this.state, {
            timer: setInterval(() => { this.setState(Object.assign({}, this.state, {progress: this.player.seek()}))}, 200)
        }));
    }

    handlePause = () => {
        clearInterval(this.state.timer);
    }

    handleSeek = (event,value) => {
        if(typeof this.player !== 'undefined') {
            const seek = (value/100.0) * this.player.duration();
            this.player.seek(seek);
        }
    }

    handleEnd = () => {
        this.props.dispatch(actions.next());
    }

    handleQueueClick = (e) => {
        e.preventDefault();
        this.props.history.push(`/playing`);
    }

    getBackEndPlayer = () => {
        // TODO: use higher-order-component to pick the right backend player (i.e. howler for direct links/ youtube embed etc.)
        return (<ReactHowler
            src={this.props.player.currentSong ? this.props.player.currentSong.song_url : 'http://localhost:3000/404'}
            playing={this.props.player.isPlaying}
            format={['mp3']}
            ref={(ref) => this.player = ref}
            onPlay={() => {this.handlePlay()}}
            onPause={() => {this.handlePause()}}
            onEnd={() => {this.handleEnd()}}
            volume={this.state.volume}
        >
        </ReactHowler>);
    }
    // <IconButton onClick={this.handleVolumeClick}>{volumeIcon}</IconButton>

    render = () => {
        const repeatActiveStyle = this.getActiveColor(this.props.player.repeat);
        const shuffleActiveStyle = this.getActiveColor(this.props.player.shuffle);
        const playingIcon = this.getPlayingIcon();
        const volumeIcon = this.getVolumeIcon();
        const progress = this.getProgress();
        const backEndPlayer = this.getBackEndPlayer();

        return (
            <div className="playerbar-container">
                <div className="playerbar-wrapper-left">
                    <PlayerSongWidget></PlayerSongWidget> 
                </div>
                <div className="playerbar-wrapper">
                    <div className="playerbar-left">
                        <IconButton onClick={this.handlePreviousClick}><AvSkipPrevious/></IconButton>
                        <IconButton onClick={this.handlePlayClick}>{playingIcon}</IconButton>
                        <IconButton onClick={this.handleNextClick}><AvSkipNext/></IconButton>
                    </div>
                    <div className="playerbar-center">
                        <Slider min={0} max={100} value={progress} onChange={this.handleSeek}></Slider>
                    </div>
                    <div className="playerbar-right">
                        <IconButton onClick={this.handleVolumeClick.bind(this)}>{this.getVolumeIcon()}</IconButton>
                        <Popover open={this.state.open}
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={{horizontal: 'middle', vertical: 'top'}}
                            targetOrigin={{horizontal: 'middle', vertical: 'bottom'}}
                            onRequestClose={this.handleVolumeClose}>
                            <div className="playerbar-volume-wrapper">
                                <div className="playerbar-volume-slider">
                                    <Slider min={0} max={1} step={0.1} value={this.state.volume} onChange={this.handleVolume}></Slider>
                                </div>
                            </div>
                        </Popover>
                        <IconButton onClick={this.handleShuffleClick}><AvShuffle color={shuffleActiveStyle}/></IconButton>
                        <IconButton onClick={this.handleRepeatClick}><AvRepeat color={repeatActiveStyle}/></IconButton>
                        <IconButton onClick={this.handleQueueClick}><AvQueueMusic/></IconButton>
                    </div>
                </div>
                <div className="playerbar-wrapper-right">
                    <div className="playersongwidget-filler"></div>
                </div>
                {backEndPlayer}
            </div>
        );
    }
};

export default muiThemeable()(withRouter(connect(
    (state) => {
        return state;
    }
)(PlayerBar)));