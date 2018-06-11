import React from 'react';
import PropTypes from 'prop-types';

export class ListElement extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = (e) => {
        e.preventDefault();
        if(this.props.onClick)
            this.props.onClick();
    }

    getStyle = () => {
        return {
            width: this.props.size
        }
    }

    render = () => {
        return (
            <div className="list-text" style={this.getStyle()} onClick={this.handleClick}>{this.props.text}</div>
        );
    }
};

ListElement.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    size: PropTypes.string
};

export default ListElement;