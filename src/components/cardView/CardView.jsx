import React from 'react';
import PropTypes from 'prop-types';

export class CardView extends React.Component {
    constructor(props) {
        super(props);
    }

    filler = () => {
        return Array(10).fill(0).map((v,i) => { return (<div key={i} className='list-card'></div>)});
    }

    render = () => {
        return (
            <div className="list-cards">
                {this.props.children} 
                {this.filler()}
            </div>
        );
    }
};

export default CardView;