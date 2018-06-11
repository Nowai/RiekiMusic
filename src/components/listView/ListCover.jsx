import React from 'react';
import PropTypes from 'prop-types';

export class ListCover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false
        }
    }

    handleMouseEnter = () => {
        this.setState({hover: true});
    }

    handleMouseLeave = () => {
        this.setState({hover: false});
    }

    handleClick = (e) => {
        e.preventDefault();
        if(this.props.onClick)
            this.props.onClick();
    }

    render = () => {
        return (
            <img className='list-cover' 
                src={this.props.src} 
                onClick={this.handleClick} 
                alt="cover" 
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}/>
        );
    }
};

ListCover.propTypes = {
    src: PropTypes.string.isRequired,
    onClick: PropTypes.func
}

export default ListCover;