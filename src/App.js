// External Dependencies
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles';

// Local Dependencies
import SearchBox from './Searchbox';
import GiphyFeed from './GiphyFeed';

// Local Variables
export const GiphyContext = React.createContext({});

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

// const debugGiphyContext = giphyData =>
//   !console.log('giphyData', giphyData) && (
//     <span><br /><br /><br />I got data: {JSON.stringify(giphyData)}</span>
//   );

// Component Definition
const App = ({ classes }) => {
  const [giphyData, setGiphyData] = useState(null);
  return (
    <ThemeProvider theme={theme}>
      <GiphyContext.Provider value={giphyData}>
        <div className={classes.root}>
          <Typography variant="h3">Mo Gifs</Typography>
          <SearchBox onSearch={res => setGiphyData(res)} />
        </div>
        <GiphyFeed />
      </GiphyContext.Provider>
    </ThemeProvider>
  );
};

App.propTypes = propTypes;

export default withStyles(styles)(App);
