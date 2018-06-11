import React from 'react';

export class ListRowLeft extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <div className="list-left">
                {this.props.children}
            </div>
        );
    }
};

export default ListRowLeft;