import Layout from 'layouts/Unauthenticated';
import React, { useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import logo from 'assets/logosmec.png';
import { post } from 'services/api';
import { setToken, removeToken, isAuthenticated } from 'services/authentication';

const schema = {
  username: PropTypes.string,
  passwd: PropTypes.string,
}

const initialValues = {
  username: 'admin',
  passwd: 'admin',
};

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    paddingTop: '20px',
    display: 'grid',
    gridGap: '15px',
  },
  card: {
    minWidth: 275,
    maxWidth: 600,
    borderRadius: '1%',
  },
  media: {
    paddingTop: '17px',
    height: 160,
  },
  introduce_text: {
    textAlign: 'center',
    paddingTop: '5px',
  },
}));

const Login = (props) => {
  const classes = useStyles();

  const onSubmit = useCallback(async (params, { setSubmitting }) => {
    try {
      const response = await post('/auth', params);
      if (response.status === 401 || response.sattus === 429) {
        removeToken();
        return 0;
      }
      const { jwt } = await response.json();
      setToken(jwt);
      props.history.push('/');
    } catch (e) {
      console.log("Error on submit - There's something wrong", e);
    }
    finally {
      setSubmitting(false);
    }
  }, [props.history]);

  useEffect(() => {
    if (isAuthenticated()) { props.history.push('/') }
  }, [props.history]);

  return (
    <Layout className={classes.container} title="Login">
      <Card className={classes.card}>
        <CardMedia
          component="img"
          className={classes.media}
          image={logo}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography
            className={classes.introduce_text}
            variant="body1"
            color="textSecondary"
            component="p"
          >
            Bem-vindo ao <b>SMEC²</b>
          </Typography>
          <Typography
            className={classes.introduce_text}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            O Sistema de Monitoramento de Estações Climáticas Open Source.
          </Typography>
          <Typography
            className={classes.introduce_text}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            Versão : 1.2.1-SNAPSHOT
            </Typography>
          <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
            {({ handleChange, handleBlur, errors, touched, isSubmitting }) => (
              <Form className={classes.form}>
                <TextField
                  required={true}
                  name="username"
                  margin="dense"
                  label="Usuário"
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.username !== undefined && touched.username === true}
                />
                <TextField
                  required={true}
                  name="passwd"
                  label="Senha"
                  margin="dense"
                  variant="standard"
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.passwd !== undefined && touched.passwd === true}
                />
                <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                  Entrar
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Layout>
  );
}

export default Login;