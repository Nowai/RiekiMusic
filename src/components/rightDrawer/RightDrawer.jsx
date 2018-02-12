import React from 'react';
import {connect} from 'react-redux';

// mui
import Drawer from 'material-ui/Drawer';
import {List} from 'material-ui/List';

// components
import Item from 'rightDrawer/Item';

export class RightDrawer extends React.Component {
    constructor(props) {
        super(props);
    }

    getItems = () => {
        console.log(this.props);
        return this.props.player.playlist.map((item,index) => {
            // TODO: fix styling to use global style and not be hardcoded!
            const style = index == this.props.player.currentIndex ? {backgroundColor: 'lightgrey'} : {backgroundColor: 'white'}; 
            console.log(style);
            return (
                <Item {...item} key={index} style={style}></Item>
            );
        });
    }

    render = () => {
        const isOpen = this.props.showRightMenu;
        const items = this.getItems();

        return (
            <Drawer
                open={isOpen}
                openSecondary={true}
            >
            {items}
            </Drawer>
        );
    }
};

export default connect(
    (state) => {
        return state;
    }
)(RightDrawer);