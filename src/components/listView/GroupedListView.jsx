import React from 'react';
import PropTypes from 'prop-types';

// components
import ListView from 'listView/ListView';

// mui
import Divider from 'material-ui/Divider';

export class GroupedListView extends React.Component {
    constructor(props) {
        super(props);
    }

    getGroups = () => {
        const groups = this.props.groups;
        return groups.map((group, index) => {
            return (<div key={index}>
                <h3 className="grouped-list-view-title">{group.groupTitle}</h3>
                <ListView items={group.items}></ListView>
                <Divider></Divider>
            </div>)
        });
    }

    render = () => {
        const groups = this.getGroups();
        return (
            <div>
                {groups}
            </div>
        );
    }
};

GroupedListView.propTypes = {
    groups: PropTypes.array.isRequired
};

export default GroupedListView;