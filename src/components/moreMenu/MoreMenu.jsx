import React from 'react';

// mio
import IconButton from 'material-ui/IconButton';
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';

export class MoreMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return (
            <IconMenu iconButtonElement={<IconButton><NavigationMoreVert/></IconButton>}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                >
                {this.props.children}
            </IconMenu>
        );
    }
}

export default MoreMenu;