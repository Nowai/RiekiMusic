import React from 'react';
import PropTypes from 'prop-types';

export class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hover: false
        }
    }

    handleMouseEnter = (e) => {
        e.preventDefault();
        this.setState({hover:true});
    }

    handleMouseLeave = (e) => {
        e.preventDefault();
        this.setState({hover:false});
    }

    render = () => {
        return (
            <div className="list-card">
                <div className="list-card-image" style={{backgroundImage: `url("${this.props.imgsrc}")`}} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                    <div className="list-card-wrapper" style={{opacity: this.state.hover ? 1.0 : 0.0}}>
                        {this.props.children}
                    </div>
                </div>
                <div className="list-card-text">
                    <b onClick={this.props.primaryAction ? this.props.primaryAction : () => {}}>{this.props.primaryText}</b>
                    <p onClick={this.props.secondaryAction ? this.props.secondaryAction : () =>{}}>{this.props.secondaryText}</p>
                </div>
            </div>
        );
    }
};

Card.propTypes = {
    imgsrc: PropTypes.string.isRequired,
    primaryText: PropTypes.string.isRequired,
    secondaryText: PropTypes.string.isRequired,
    primaryAction: PropTypes.func,
    secondaryAction: PropTypes.func
};

export default Card;
