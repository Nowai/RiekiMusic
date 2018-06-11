import React from 'react';

export class ViewTitle extends React.Component {
    constructor(props) {
        super(props)
    }

    render = () => {
        return (<div className="view-title">{this.props.children}</div>);
    }
};

export default ViewTitle;