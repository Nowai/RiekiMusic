import React from 'react';

export class List extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div className="list-parent">
                {this.props.children}
            </div>
        );
    }
};

export default List;