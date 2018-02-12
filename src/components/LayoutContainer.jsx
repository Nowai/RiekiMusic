import React from 'react';

export class LayoutContainer extends React.Component {
    constructor(props) {
       super(props);
    }

    render = () => {
        return (
            <div className="layout-container">
                {this.props.children}
            </div>
        );
    }
};

module.exports = LayoutContainer;