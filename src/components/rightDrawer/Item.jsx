import React from 'react';

// mui
import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

export class Item extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = (e) => {
        e.preventDefault();
        // TODO: implement functionality
    }

    render = () => {
        return (
            <ListItem
                primaryText={this.props.primaryText}
                secondaryText={this.props.secondaryText}
                onClick={this.handleClick}
                leftAvatar={<Avatar src={this.props.avatar}/>} 
                style={this.props.style}
            ></ListItem>
        );
    };
};

export default Item;
