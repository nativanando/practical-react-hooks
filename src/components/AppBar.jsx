import React, { useCallback } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import PeopleIcon from '@material-ui/icons/PeopleOutline';
import { removeToken } from '../services/authentication';
import { withRouter } from "react-router";
import { privateRoutes } from '../services/router';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: 'linear-gradient(to right bottom, #536976, #292E49)',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    backgroundColor: '#394255',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: '#394255',
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: '#394255',
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    background: 'linear-gradient(to right bottom, #292E49, #536976)',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbarText: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '0px 50px',
    color: '#ffff',
    ...theme.mixins.toolbar,
  },
  titleText: {
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  rightToolbar: {
    marginLeft: 'auto',
    marginRight: -12,
  },
  secondary: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    minWidth: drawerWidth - 100,
    color: '#ffff',
    fontSize: '13px',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  textItems: {
    color: '#ffff',
  },
  MenuIconProps: {
    color: '#ffff',
    height: '20px',
  }
}));

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    borderRadius: '10%',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {

  },
}))(MenuItem);

const StyledListItem = withStyles(theme => ({
  root: {

  },
  button: {
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: '#20a8d8',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },


}))(ListItem);

const StyledIconButton = withStyles(theme => ({
  root: {
    '&:hover': {
      backgroundColor: '#20a8d8',
    },
  },
}))(IconButton);

const DrawerMenu = (props) => {
  const classes = useStyles();

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [title] = React.useState(props.greeting);
  const [routes, setRoutes] = React.useState(privateRoutes);

  const handleClickItem = (event) => {
    let values = [...routes];
    values[event.currentTarget.id].isOpened = !values[event.currentTarget.id].isOpened;
    setRoutes(values);
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  }

  const handleDrawerClose = () => {
    routes.map(function (route) {
      if (route.isOpened === true) {
        route.isOpened = false;
      }
      return 0;
    });
    setOpen(false);
  }

  const handleLogOut = useCallback(async () => {
    try {
      removeToken();
      props.history.push('/login');
    } catch (e) {
      console.log("Error on submit - There's something wrong", e);
    }
  }, [props.history]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <StyledIconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </StyledIconButton>
          <Typography variant="h6" noWrap >
            Sistema de Monitoramento de Estações Climáticas
          </Typography>
          <Typography variant="h5" noWrap align='center' className={classes.titleText}>
            {title}
          </Typography>
          <IconButton className={classes.rightToolbar} aria-label="Delete" color="inherit" onClick={handleClick}>
            <PeopleIcon />
          </IconButton>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem onClick={handleLogOut}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Sair" />
            </StyledMenuItem>
          </StyledMenu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <Typography variant="h5" className={classes.toolbarText}>SMEC²</Typography>
          <StyledIconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon className={classes.MenuIconProps} />}
          </StyledIconButton>
        </div>
        <Divider />
        <List>
          {routes.map(({ path, text, subtitle, Icon, subPath, isOpened }, key) => (
            <div key={key}>
              <StyledListItem button={true} dense={true} component={Link} to={path} id={key} title={text}
                onClick={handleClickItem}>
                <ListItemIcon className={classes.textItems}>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={text} className={classes.textItems}
                  secondary={subtitle}
                  classes={{
                    secondary: classNames({
                      [classes.secondary]: open,
                    }),
                  }}
                />
                {subPath.length > 0 ? (isOpened ? <ExpandLess className={classes.MenuIconProps} /> : <ExpandMore className={classes.MenuIconProps} />) : false}
              </StyledListItem>
              {subPath.map(({ path, component, text, Icon }, i) => (
                <Collapse in={isOpened} timeout="auto" unmountOnExit key={i}>
                  <List>
                    <StyledListItem button={true} dense={true} component={Link} to={path} id={i} className={classes.nested}>
                      <ListItemIcon className={classes.textItems}>
                        <Icon />
                      </ListItemIcon>
                      <ListItemText className={classes.textItems} primary={text} />
                    </StyledListItem>
                  </List>
                </Collapse>
              ))}
            </div>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

export default withRouter(DrawerMenu);

