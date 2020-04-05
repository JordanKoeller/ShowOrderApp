import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

import Toolbar from '@material-ui/core/Toolbar';
import { IconButton } from '@material-ui/core';
import { CloudUpload } from '@material-ui/icons';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
    pointerEvents: 'none',
  },
  search: {
    'position': 'relative',
    'borderRadius': theme.shape.borderRadius,
    'backgroundColor': fade(theme.palette.common.white, 0.55),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.75),
    },
    'marginRight': theme.spacing(2),
    'marginLeft': 0,
    'width': '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'primary',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  appBarRoot: {
    backgroundColor: '#ffffffbb',
    width: '100%',
  },
  title: {
    color: 'primary'
  },
  input: {
    display: 'none',
  }
}));

/**
 * MenuBar component
 */
export default function MenuBar({handler}) {
  const classes = useStyles();

  const handleUpload = event => {
    event.stopPropagation();
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      handler(file);
    }
  }

  return (
    <div className={classes.root} style={{ height: '100px' }}>
      <AppBar
        elevation={0}
        classes={{
          root: classes.appBarRoot,
        }}>
        <Toolbar>
          <div className={classes.grow} />
          <Typography variant="h3" color="textPrimary">
            Show Order Calculator
          </Typography>
          <div className={classes.grow} />
          <div className={classes.grow} />
          <input
            className={classes.input}
            id="file-upload-button"
            type="file"
            onChange={handleUpload}
            multiple />
          <label htmlFor="file-upload-button">
            <IconButton aria-label="upload file" component="span">
              <CloudUpload />
            </IconButton>
          </label>
        </Toolbar>
      </AppBar>
    </div>
  );
}