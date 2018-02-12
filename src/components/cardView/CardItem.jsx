import React from 'react';
import PropTypes from 'prop-types';

// mui
import {Card, CardMedia, CardTitle} from 'material-ui/Card';

export class CardItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div className="card">
                <Card>
                    <CardMedia>
                        <img src={this.props.image} alt="song cover"/>                    
                    </CardMedia>
                    <CardTitle title={this.props.title} 
                            subtitle={this.props.subtitle}
                            titleStyle={{fontSize: '16px', textOverflow: 'ellipsis', overflow:'hidden', whiteSpace: 'nowrap'}}
                        ></CardTitle>
                </Card>
            </div>
        );
    }
};

CardItem.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired
};

export default CardItem;
