import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#ff9d83',
        main: '#f37147',
        dark: '#b9452e',
      },
      text: {
        primary: '#404040',
        secondary: '#eeeeee',
        disabled: '#aaaaaa',
      },
      secondary: lightBlue,
      contrastThreshold: 2,
    },
    status: {
      danger: 'orange',
    },
  });

  
}

export default App;
