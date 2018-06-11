import React from 'react';

export class ListRowCenter extends React.Component {
    constructor(props) {
        super(props);
    }

    renderChildren = () => {
        const count = this.props.children.length;
        return React.Children.map(this.props.children, child => {
            return React.cloneElement(child, Object.assign({}, child.props, {
              size: `${(100.0/count)}%`  
            })
            );
        });
    }

    render = () => {
        return (
            <div className="list-center">
                {this.renderChildren()}
            </div>
        );
    }
};

export default ListRowCenter;