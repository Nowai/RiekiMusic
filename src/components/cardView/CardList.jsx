import React from 'react';

// components
import CardItem from '../cardView/CardItem';

export class CardList extends React.Component {
    constructor(props) {
        super(props);
    }

    getCards = () => {
        return this.props.items.map( (item, index)  => {
            return <CardItem key={index} image={item.avatar} title={item.primaryText} subtitle={item.secondaryText}></CardItem>
        })
    }
    
    render = () => {
        let cards = this.getCards();
        return (
            <div className="card-container">
                {cards}
            </div>
        );
    }
}

export default CardList;