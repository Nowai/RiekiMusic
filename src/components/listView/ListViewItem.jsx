import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

// mui
import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ImageMusicNote from 'material-ui/svg-icons/image/music-note';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';


export class ListViewItem extends React.Component {
    constructor(props) {
        super(props);
    }

    getAvatar = () => {
        const avatar = this.props.avatar;
        if(avatar=='default')
            return <Avatar icon={<ImageMusicNote/>}/>;
        else 
            return <Avatar src={avatar} style={{borderRadius: 0}}/>;
    }

    getIconMenu = (items) => {
        const menuItems = items.map((item,index) => {
            return <MenuItem key={index} primaryText={item.text} onClick={item.onClick}></MenuItem>
        });
        return <IconMenu iconButtonElement={
            <IconButton>
                <MoreVertIcon></MoreVertIcon>
            </IconButton>
            }
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
        >
            {menuItems}
        </IconMenu>
    }

    getListItemProps = () => {
        // create avatar
        let props = {};
        props.leftAvatar = this.getAvatar();
        // primary
        props.primaryText = this.props.primaryText;
        // secondary
        if(Boolean(this.props.secondaryText))
            props.secondaryText = this.props.secondaryText;
        // onClick
        props.onClick = this.props.clickHandler;
        return props;
    }

    render = () => {
        const itemProps = this.getListItemProps();
        const menu = this.getIconMenu(this.props.menu);
        return (
            <div>
                <ListItem
                    {...itemProps}
                    rightIconButton={menu}
                ></ListItem>
            </div>
        );
    }
};

ListViewItem.propTypes = {
    avatar: PropTypes.string.isRequired,
    primaryText: PropTypes.string.isRequired,
    secondaryText: PropTypes.string,
    clickHandler: PropTypes.func.isRequired,
    menu: PropTypes.array 
}

export default withRouter(ListViewItem);