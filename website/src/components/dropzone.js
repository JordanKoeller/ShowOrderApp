import React from 'react';
import {useDropzone} from 'react-dropzone';
import {makeStyles, createStyles} from '@material-ui/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => createStyles({
  root: {
    // alignItems: 'center',
    // alignContent: 'center',
    height: '1000px',
    width: '100%',
  },
  progress: {
    width: '100%',
  },
  container: {
    // alignItems: 'center',
    // alignContent: 'center',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: theme.light, // '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: theme.light, // '#fafafa',
    color: theme.main, // '#bdbdbd',
    outline: 'none',
    padding: '20%',
    marginBottom: "auto",
    overflowX: 'hidden',
    overflowY: 'hidden',
  },
  dragging: {
    height: '1000px',
    width: '100%',
    margin: 'auto',
    filter: "opacity(30%)"
  },
  centerText: {
    position: "fixed",
    width: "300px",
    height: "300px",
    top: "50%",
    left: "50%",
    marginLeft: "-150px",
    marginTop: "-150px" ,
    backgroundColor: "white",
    opacity: "70%"
  }
}));

/**
 * Drop: Use this for location to drop files
 * @param {Object} params
 * @param {{datum: Promise<Object>, path: string} => void} params.callback - callback function to execute when a file is dropped.
 * @param {ReactNode} params.component - component to render as the main body of the dropzone
 */
function Dropzone({callback, component, showOverlay}) {
  const classes = useStyles();
  const onDrop = (acceptedFiles => {
    acceptedFiles.forEach(file => {
      callback(file);
    });
  });
  const {getRootProps, isDragActive} = useDropzone({onDrop});
  const needsOverlay = isDragActive || showOverlay;
  return <div>
      <div {...getRootProps({className: 'dropzone'})} className={classes.root}>
        <div className={needsOverlay ? classes.dragging: ""}>
        {component}
        </div>
        {needsOverlay ? <div id="text" className={classes.centerText}><h1>Drag and Drop CSV File </h1></div> : ""}
      </div>
    </div>;
}

Dropzone.propTypes = {
  id: PropTypes.number,
};

export default Dropzone;