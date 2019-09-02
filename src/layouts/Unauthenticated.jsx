import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: '#394255',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: theme.spacing(24),
    },
  },
}));

const Unauthenticated = (props) => {
  const classes = useStyles();

  return (
    <main className={classes.body}>{props.children}</main>
  )
}

export default Unauthenticated;