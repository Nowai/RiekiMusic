import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// Components
import LoadingIndicator from 'LoadingIndicator';

export class ScrollLoader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: Math.random().toString(35).substr(2,7)
        }
    }

    componentDidMount = () => {
        document.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount = () => {
        document.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        const el = document.getElementById(this.state.uid);
        if(el && el.getBoundingClientRect().bottom <= window.innerHeight && this.props.isEnabled) {
            this.props.onTrigger();
        }
    }
    
    render = () => {
        return (
            <div id={this.state.uid}>
                {this.props.children}
                <LoadingIndicator isLoading={this.state.isFetching}/>
            </div>
        );
    }
};

ScrollLoader.propTypes = {
    onTrigger: PropTypes.func.isRequired,
    isEnabled: PropTypes.bool.isRequired
};

export default connect()(ScrollLoader);