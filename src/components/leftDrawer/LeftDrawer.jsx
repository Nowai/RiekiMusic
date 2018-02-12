import React from 'react';
import {connect} from 'react-redux';

// mui
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import AvPlayCircleOutline from 'material-ui/svg-icons/av/play-circle-outline';
import Divider from 'material-ui/Divider';
import ImageMusicNote from 'material-ui/svg-icons/image/music-note';
import AvNewReleases from 'material-ui/svg-icons/av/new-releases';
import ActionStars from 'material-ui/svg-icons/action/stars';
import AvSubscriptions from 'material-ui/svg-icons/av/subscriptions';
import AvPlaylistAdd from 'material-ui/svg-icons/av/playlist-add';

// components
import Item from 'leftDrawer/Item';

export class LeftDrawer extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        const isOpen = this.props.showLeftMenu;

        return (
            <Drawer
                open={isOpen}
            >
                <List style={{paddingBottom:'60px'}}>
                    <Subheader>General</Subheader>
                    <Divider/>
                    <Item primaryText="Songs" leftIcon={<ImageMusicNote/>} destination="/songs"></Item>
                    <Item primaryText="Artists" leftIcon={<ImageMusicNote/>} destination="/artists"></Item>
                    <Item primaryText="Albums" leftIcon={<ImageMusicNote/>} destination="/albums"></Item>
                    <Subheader>Smart Playlists</Subheader>
                    <Divider/>
                    <Item primaryText="New" leftIcon={<AvNewReleases/>} destination="/new"></Item>
                    <Item primaryText="Best" leftIcon={<ActionStars/>} destination="/best"></Item>
                    <Item primaryText="Stream" leftIcon={<AvSubscriptions/>} destination="/stream"></Item>
                    <Subheader>Custom Playlists</Subheader>
                    <Divider/>
                    <Item primaryText="New Playlist" leftIcon={<AvPlaylistAdd/>} nested={false} destination="/new"></Item>
                </List> 
            </Drawer>
        );
    }
};

export default connect(
    (state) => {
        return state;
    }
)(LeftDrawer);