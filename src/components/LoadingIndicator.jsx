import React from 'react';

// mui
import RefreshIndicator from 'material-ui/RefreshIndicator';

export class LoadingIndicator extends React.Component {
    constructor(props) {
        super(props);
    }

    getRenderer = () => {
        if(this.props.isLoading) {
            return (
                <div style={{textAlign:'center'}}><RefreshIndicator
                    left={-20}
                    top={10}
                    size={40}
                    status="loading"
                    style={{position:'relative', display:'inline-block'}}
                ></RefreshIndicator></div>);
        }
        else 
            return (
                <div></div>
            );
    }

    render = () => {
        return this.getRenderer();
    };
}

LoadingIndicator.defaultProps = {
    isLoading: false
};

export default LoadingIndicator;