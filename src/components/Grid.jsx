import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

const GridList = (props) => {
  const classes = useStyles();
 
  return (
    <div className={classes.root}>
      <Grid container>
        {props.children}
      </Grid>
    </div>
  );
}

export default GridList;