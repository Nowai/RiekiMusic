import React from 'react';
import {withRouter} from 'react-router-dom';

// components
import LeftMenuItem from 'components/leftMenu/LeftMenuItem';

export class LeftMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    goTo = (location) => {

    }

    render = () => {
        return (
            <div className="left-menu">
                <div className="left-menu-scroll">
                    <div className="left-menu-padding"></div>
                    <div className='left-menu-heading'>your library</div>
                    <LeftMenuItem text='Songs' destination='/songs'></LeftMenuItem>
                    <LeftMenuItem text='Albums' destination='/albums'></LeftMenuItem>
                    <LeftMenuItem text='Artists' destination='/artists'></LeftMenuItem>
                    <LeftMenuItem text='Favorites' destination='/favorites'></LeftMenuItem>
                    <LeftMenuItem text='New' destination='/new'></LeftMenuItem>
                    <div className="left-menu-padding"></div>
                    <div className="left-menu-heading">discover</div>
                    <LeftMenuItem text='Reddit' destination='/reddit_discover'></LeftMenuItem>
                    <div className="left-menu-padding"></div>
                    <div className="left-menu-heading">playlists</div>
                    <LeftMenuItem text='new playlist' destination='/new_playlist'></LeftMenuItem>
                </div>
            </div>
        );
    }
}

export default LeftMenu;