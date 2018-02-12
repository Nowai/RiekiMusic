import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

// mui
import {ListItem} from 'material-ui/List';
import ImageMusicNote from 'material-ui/svg-icons/image/music-note';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';
import AvShuffle from 'material-ui/svg-icons/av/shuffle';

export class Item extends React.Component {
    constructor(props) {
        super(props);
    }

    getNestedMenu = () => {
        return [
            <ListItem key={1} 
                primaryText="Play all"
                leftIcon={<AvPlayArrow/>}
            />,
            <ListItem key={2} 
                primaryText="Play all shuffled"
                leftIcon={<AvShuffle/>}    
            />
        ];
    }

    handleClick = (e) => {
        e.preventDefault();
        const destination = this.props.destination || '';
        this.props.history.push(destination);
    }

    render = () => {
        const nestedMenu = this.getNestedMenu();
        return (
            <ListItem
                primaryText={this.props.primaryText}
                leftIcon={this.props.leftIcon}
                initiallyOpen={false}
                onClick={this.handleClick}
                primaryTogglesNestedList={false}
                nestedItems={nestedMenu}
            ></ListItem>
        );
    }
};

export default withRouter(connect()(Item));