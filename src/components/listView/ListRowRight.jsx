import React from 'react';
import PropTypes from 'prop-types';

// components
import {colors} from 'components/Colors';

// mio
import IconButton from 'material-ui/IconButton';
import ActionFavorite, { FileFolder } from 'material-ui/svg-icons/action/favorite';
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

export class ListRowRight extends React.Component {
    constructor(props) {
        super(props);
    }

    getLikeButton = () => {
        return this.props.isLikeable ? (<IconButton><ActionFavorite/></IconButton>) : (<div className="list-right-filler"></div>);
    }

    render = () => {
        return (
            <div className="list-right">
                {this.getLikeButton()}
                <p>{this.props.text}</p>
                {this.props.children ? this.props.children : (<div className="list-right-filler"></div>)}
            </div>
        );
    }
};

ListRowRight.propTypes = {
    text: PropTypes.string.isRequired,
    isLikeable: PropTypes.bool,
    isLiked: PropTypes.bool,
    onLike: PropTypes.func
};

export default ListRowRight;