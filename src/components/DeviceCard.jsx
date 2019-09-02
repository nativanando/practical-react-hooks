import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import DeviceIcon from '@material-ui/icons/Memory';
import PencilIcon from '@material-ui/icons/Create';
import Grid from '@material-ui/core/Grid';
import Moment from 'react-moment';

const useStyles = makeStyles(theme => ({
  card: {
    maxHeight: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardStyle: {
    padding: theme.spacing(2, 5),
    align: 'center',
  },
  titleText: {
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  cardHeader: {
    background: 'linear-gradient(to right bottom, #f5f7fa, #c3cfe2)',
  }
}));

const DeviceCard = (props) => {
  const classes = useStyles();
  
  return (
    props.cards.map(({ label, status, created, id }, i) =>
      <Grid item xs={4} sm={3} className={classes.cardStyle} key={i}>
        <Card className={classes.card}>
          <CardHeader className={classes.cardHeader}
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                <DeviceIcon />
              </Avatar>
            }
            action={
              <IconButton aria-label="Settings">
                <PencilIcon />
              </IconButton>
            }
            title={label} align='center'
            subheader={id}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {'Status - ' + status}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Data de criação - 
              <Moment format=" YYYY-MM-DD HH:mm">
              {created}
              </Moment>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    )
  );
}

export default DeviceCard;