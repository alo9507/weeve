import React from "react";
import "./style.css";
import logo from "../../assets/images/image-logo.svg";
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';

const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: {
      main: '#ab47bc',
    },
  },
});

const App = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="App-wrapper">
          {props.children}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
