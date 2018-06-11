import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// mio
import MenuItem from 'material-ui/MenuItem';

export class ActionMenuItem extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = (e) => {
        this.props.dispatch(this.props.action());
    }

    render = () => {
        return (
           <MenuItem onClick={this.handleClick} primaryText={this.props.label}></MenuItem> 
        );
    }
}

MenuItem.propTypes = {
    label: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired
}

export default connect(
    (state) => {
        return {}
    }
)(ActionMenuItem);