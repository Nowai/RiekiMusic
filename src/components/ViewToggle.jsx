import React from 'react';
import PropTypes from 'prop-types';

// mio
import IconButton from 'material-ui/IconButton';
import ActionViewModule from 'material-ui/svg-icons/action/view-module';
import ActionViewList from 'material-ui/svg-icons/action/view-list';
import TextField from 'material-ui/TextField';

export class ViewToggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selection: 'cards'
        };
    }

    handleCardsClick = (e) => {
        e.preventDefault();
        this.props.onSelect('cards');
        this.setState({selection: 'cards'});
    }

    handleListClick = (e) => {
        e.preventDefault();
        this.props.onSelect('list');
        this.setState({selection: 'list'});
    }

    render = () => {
        return (
            <div className="view-toggle-wrapper">
                <div className="view-toggle-left">
                    {this.props.children}  
                </div>
                <div className="view-toggle-right">
                    <IconButton onClick={this.handleCardsClick} iconStyle={{color: 'white'}}><ActionViewModule/></IconButton>
                    <IconButton onClick={this.handleListClick} iconStyle={{color: 'white'}}><ActionViewList/></IconButton>
                    <TextField hintText='Filter'></TextField>
                </div>
            </div>
        )
    }
};

ViewToggle.propTypes = {
    onSelect: PropTypes.func.isRequired
}


export default ViewToggle;