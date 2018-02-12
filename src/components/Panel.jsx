import React from 'react';
import {connect} from 'react-redux';

export class Panel extends React.Component {
    constructor(props) {
        super(props);
    }

    generateStyle = () => {
        let style = {};
        if(this.props.showLeftMenu)
            style.paddingLeft = '255px';
        if(this.props.showRightMenu)
            style.paddingRight = '255px';
        return style;
    }

    render = () => {
        const style = this.generateStyle();
        return (
            <div style={style}>
                {this.props.children}
            </div>
        );
    }
};

export default connect(
    (state) => {
        return state;
    }
)(Panel);