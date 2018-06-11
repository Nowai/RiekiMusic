import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

export class LeftMenuItem extends React.Component {
    constructor(props) {
        super(props);
    }
    goTo = (e) => {
        e.preventDefault();
        this.props.history.push(this.props.destination);
    }

    getClassName = () => {
        return this.props.location.pathname.includes(this.props.destination) ? 'left-menu-item highlighted' : 'left-menu-item';
    }

    render = () => {
        return (
            <div className={this.getClassName()} onClick={this.goTo}>
                <i></i>
                {this.props.text}
            </div>
        );
    }
};

LeftMenuItem.propTypes = {
    destination: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
};

export default withRouter(LeftMenuItem);