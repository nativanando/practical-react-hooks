import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import PencilIcon from '@material-ui/icons/Create';
import Grid from '@material-ui/core/Grid';
import Moment from 'react-moment';
import TemplateIcon from '@material-ui/icons/FileCopy';
import CardActions from '@material-ui/core/CardActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import DeviceIcon from '@material-ui/icons/Memory';

const useStyles = makeStyles(theme => ({
  card: {
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
  },
  attrsSpacing: {
    padding: theme.spacing(1),
    paddingLeft: '2px',
  },
  collapseSpacing: {
    paddingTop: '0px',
  }
}));

const TemplateCard = (props) => {
  const classes = useStyles();

  const [templates, setTemplates] = React.useState([])

  useEffect(() => {
    // componentDidMount(), componentDidUpdate()
    setTemplates(props.cards);
    // effect dependency array
  }, [props.cards]);

  const handleExpandClick = (event) => {
    let values = [...templates];
    values[event.currentTarget.id].detail = !values[event.currentTarget.id].detail;
    setTemplates(values);
  }

  return (
    templates.map(({ label, created, id, detail, attrs }, key) =>
      <Grid item xs={4} sm={3} className={classes.cardStyle} key={key}>
        <Card className={classes.card}>
          <CardHeader className={classes.cardHeader}
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                <TemplateIcon />
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
          <CardActions disableSpacing>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary" component="p" className={classes.attrsSpacing}>
                Data de criação -
              <Moment format=" YYYY-MM-DD HH:mm">
                  {created}
                </Moment>
              </Typography>
              <Typography variant="subtitle2" color="textSecondary" component="p" className={classes.attrsSpacing}>
                {attrs.length} Propriedades
              </Typography>
            </CardContent>
            <IconButton
              id={key}
              className={clsx(classes.expand, {
                [classes.expandOpen]: detail,
              })}
              onClick={handleExpandClick}
              aria-expanded={detail}
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={detail} timeout="auto" unmountOnExit>
            <CardContent className={classes.collapseSpacing}>
              {attrs.map(({ label, type, value_type, created }, i) => (
                <Grid container className={classes.attrsSpacing} key={i}>
                  <Grid item xs={2}>
                    <DeviceIcon />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography color="textSecondary" ><b>{label} - {value_type} {type}</b></Typography>
                  </Grid>
                </Grid>
              ))}
            </CardContent>
          </Collapse>
        </Card>
      </Grid>
    )
  );
}

export default TemplateCard;