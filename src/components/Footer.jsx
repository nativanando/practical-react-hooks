import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    flexDirection: 'column',
  },
}));

const StickyFooter = (props) => {
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <footer className={classes.footer}>
        {props.children}
      </footer>
    </Grid>
  );
}

export default StickyFooter;