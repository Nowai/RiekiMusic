import React from 'react';
import PropTypes from 'prop-types';

export class ListRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div className={this.props.isActive ? 'list-child list-child-active' : 'list-child'}>
                {this.props.children}
            </div>
        );
    }
};

ListRow.propTypes = {
    isActive: PropTypes.bool
}

export default ListRow;