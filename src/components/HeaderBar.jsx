import React from 'react';
import {connect} from 'react-redux';

// actions
import * as actions from 'actions/toggleActions';

// mui
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import AvQueueMusic from 'material-ui/svg-icons/av/queue-music';

export class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = (e) => {
        e.preventDefault();
        this.props.dispatch(actions.toggleLeftMenu());
    }

    handleRightClick = (e) => {
        e.preventDefault();
        this.props.dispatch(actions.toggleRightMenu());
    }

    getLeftIcon = () => {
        return !this.props.showLeftMenu ? <IconButton><NavigationMenu/></IconButton> : <IconButton><NavigationClose/></IconButton>;
    }

    getRightIcon = () => {
        return !this.props.showRightMenu ? <IconButton><AvQueueMusic/></IconButton> : <IconButton><NavigationClose/></IconButton>;
    }

    render = () => {
        const showLeftMenu = this.props.showLeftMenu; 
        const leftIcon = this.getLeftIcon();
        const rightIcon = this.getRightIcon();
        return (
            <AppBar
                title="muimp"
                iconElementLeft={leftIcon}
                iconElementRight={rightIcon}
                onLeftIconButtonTouchTap={this.handleClick}
                onRightIconButtonTouchTap={this.handleRightClick}
            >
            </AppBar>
        );
    }
};

export default connect(
    (state) => {
        return state;
    }
)(HeaderBar);