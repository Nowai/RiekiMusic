import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

// mio
import MenuItem from 'material-ui/MenuItem';

export class GotoMenuItem extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = (e) => {
        this.props.history.push(this.props.destination);
    }

    render = () => {
        return (
            <MenuItem onClick={this.handleClick} primaryText={this.props.label}></MenuItem>
        );
    }
}

GotoMenuItem.propTypes = {
    label: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired
}

export default withRouter(GotoMenuItem);