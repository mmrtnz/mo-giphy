// External Dependencies
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles';

// Local Dependencies
import SearchBox from './Searchbox';

// Local Variables
const propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },
};

// Component Definition
const App = ({ classes }) => (
  <ThemeProvider theme={theme}>
    <div className={classes.root}>
      <Typography variant="h3">Mo Gifs</Typography>
      <SearchBox />
    </div>
  </ThemeProvider>
);

App.propTypes = propTypes;

export default withStyles(styles)(App);
