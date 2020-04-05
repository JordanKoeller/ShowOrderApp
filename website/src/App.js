import React, {useState} from 'react';
import { readString } from 'react-papaparse'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';
import './App.css';
import MenuBar from './components/top-menu-bar'
import Dropzone from './components/dropzone'
import { Divider, Container } from '@material-ui/core';
import computeCollisions from './csv-parsing';
import ComputeShowOrdersForm from './components/compute-show-orders-form';
/**
 * Root App component
 */
function App({runLambda}) {
  // Trigger loading of data layers into redux here

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

  const [state, setState] = useState({file: undefined});

  // if (runLambda) {
  //   console.log("Running lambda");
  //   if (state.file) {
  //     // Need to submit to lambda
  //   }
  // }


  const handler = (file) => {
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = function (evt) {
      console.log("Uploaded file");
      const csv = readString(evt.target.result);
      const collisionMatrix = computeCollisions(csv);
      console.log(collisionMatrix);
      setState({dancerData: collisionMatrix});
    }
    reader.onerror = function (evt) {
      console.log("BIG ERROR");
    }
  }

  return <div className="App">
    <ThemeProvider theme={theme}>
      <MenuBar handler={handler}/>
      <Divider />
      <Container fixed>
      <Dropzone
        component={<ComputeShowOrdersForm danceInfo={state.dancerData}/>}
        callback={handler}
        showOverlay={state.dancerData === undefined} />
      </Container>
    </ThemeProvider>
  </div>;
}

export default App;
