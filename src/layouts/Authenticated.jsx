import React from 'react';
import PrimarySearchAppBar from 'components/AppBar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Authenticated = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <PrimarySearchAppBar greeting={props.greeting} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

export default Authenticated;

