import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar'
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DeviceIcon from '@material-ui/icons/Memory';

const useStyles = makeStyles(theme => ({
  margin: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  }
}));

const ScrollDialog = (props) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [title] = React.useState(props.title);
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState('sm');

  useEffect(() => { }, [props.object]);

  const handleClickOpen = scrollType => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div>
      <Button variant="contained" color="primary" className={classes.margin} onClick={handleClickOpen('paper')}>
        <b>Visualizar</b>
        <VisibilityIcon className={classes.rightIcon}></VisibilityIcon>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
      >
        <DialogTitle id="scroll-dialog-title">{title} - <b>{props.object[0].template_label}</b></DialogTitle>
        <DialogContent dividers={scroll === 'paper'} component="span" >
          {props.object.map(({ template_id, template_label, devices }, index) =>
            <div key={index}>
              {devices.map((reptile, key) =>
                <List dense={true} key={key}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <DeviceIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={reptile}
                    />
                  </ListItem>
                </List>
              )}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}

export default ScrollDialog;