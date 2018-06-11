import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

// components
import App from 'views/App';

// material-ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import {colors} from 'components/Colors';

// styles
require('applicationStyles');

let store = require('storeConfiguration').configure();

store.subscribe(() => {
  // TODO: delete for release; just for debug purposes
  console.log(store.getState());
});


ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(colors)}>
          <App></App>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
);
