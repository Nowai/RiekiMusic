import React from 'react';
import PropTypes from 'prop-types';

export class CardHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubtitleClick = (e) => {
        e.preventDefault();
        if(this.props.onSubtitleClick)
            this.props.onSubtitleClick();
    }

    render = () => {
        return (
            <div className="card-header-wrapper">
                <div className="card-header-card-wrapper">
                    <div className="list-card">
                        <div className="list-card-image" style={{backgroundImage: `url(${this.props.cover})`}}></div>
                    </div> 
                </div>
                <div className="card-header-text-wrapper">
                    <div className="card-header-text-title">{this.props.title}</div>
                    <div className="card-header-text-subtitle">
                        <p>by </p> <div onClick={this.handleSubtitleClick}>{this.props.subtitle}</div><p>  • {this.props.count} Songs</p>
                    </div>
                </div>
            </div>
        );
    }
}

CardHeader.propTypes = {
    cover: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    onSubtitleClick: PropTypes.func,
    count: PropTypes.number.isRequired
}

export default CardHeader;