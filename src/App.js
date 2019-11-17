// External Dependencies
import React from 'react';
import Typography from '@material-ui/core/Typography';
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles';

// Local Variables
let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

// Component Definition
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Typography variant="h3">Mo Gifs</Typography>
      </div>
    </ThemeProvider>
  );
}

export default App;
