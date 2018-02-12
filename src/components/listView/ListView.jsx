import React from 'react';
import PropTypes from 'prop-types';

// components
import ListViewItem from 'listView/ListViewItem';

// mui
import {List} from 'material-ui/List';

export class ListView extends React.Component {
    constructor(props) {
        super(props);
    }

    handleItemClick = (e) => {
        e.preventDefault();
        // TODO: implement functionality
    }

    getItems = () => {
        const items = this.props.items;
        return items.map((item, index) => {
            return (<ListViewItem 
                key={index} 
                {...item}
            ></ListViewItem>)
        });
    }

    render = () => {
        const itemElements = this.getItems();
        return (
            <div>
                <List>
                    {itemElements}
                </List>
            </div>
        );
    }
};

ListView.propTypes = {
    items: PropTypes.array.isRequired
};

export default ListView;