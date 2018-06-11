import React from 'react';

// mui
import RefreshIndicator from 'material-ui/RefreshIndicator';

// colors
import {colors} from 'components/Colors';

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
                    loadingColor={colors.palette.accent1Color}
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