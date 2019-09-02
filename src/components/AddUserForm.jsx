import React, { useCallback, useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Formik } from 'formik';
import MenuItem from '@material-ui/core/MenuItem';
import { getToken } from 'services/authentication';
import * as Yup from 'yup';
import Snackbar from '@material-ui/core/Snackbar';
import SnackBarContentWrapper from 'components/SnackBarContentWrapper';
import { get } from 'services/api';
import { post } from 'services/api';
import FormHelperText from '@material-ui/core/FormHelperText';

const UserSchema = Yup.object().shape({
  username: Yup.string().required('Informe um usuário para acesso'),
  name: Yup.string().required('Informe um nome para o usuário'),
  service: Yup.string(),
  email: Yup.string().email().required('Informe um email para o usuário'),
  profile: Yup.string().required('Selecione um perfil para o usuário')
});

const initialValues = {
  username: '',
  name: '',
  service: 'admin',
  email: '',
  profile: ''
};

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
    height: 400,
  },
  attrsSpacing: {
    padding: theme.spacing(1),
    paddingLeft: '2px',
  },
  margin: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  bottomAlign: {
    paddingTop: '4px',
  }
}));

const AddUserForm = (props) => {
  const classes = useStyles();

  const [groups, setGroups] = useState([]);
  const [openSnackSubmit, setOpenSnackSubmit] = useState(false);
  const [openSnackErrorRequest, setOpenSnackErrorRequest] = useState(false);

  useEffect(() => {
    // componentDidMount(), componentDidUpdate()
    try {
      const url = "/auth/pap/group";
      const response = get(url, getToken());
      response.then(response => response.json()).then(data => {
        setGroups(data.groups);
      });
    } catch (e) {
      console.error("Error on fetch groups data - There's something wrong", e);
    }
    return () => {
      // will unmount
      return 0;
    }
    // effect dependency array
  }, []);

  const onSubmit = useCallback(async (params, { resetForm }) => {
    try {
      const url = '/auth/user';
      const response = await post(url, params, getToken());
      if (!response.ok && response.status === 400) {
        setOpenSnackErrorRequest(true);
        return 0;
      }
      resetForm(initialValues);
      setOpenSnackSubmit(true);
    } catch (e) {
      console.error("Error on save the user information - There's something wrong");
    }
  }, []);

  const handleCloseSnackSubmit = () => {
    setOpenSnackSubmit(false);
  };

  const handleCloseSnackErrorRequest = () => {
    setOpenSnackErrorRequest(false);
  }

  return (
    <Formik initialValues={initialValues} validationSchema={UserSchema} onSubmit={onSubmit}>
      {({ values, handleChange, handleBlur, errors, touched, isSubmitting, resetForm }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="username"
                margin="dense"
                label="Usuário"
                value={values.username.trim() || ''}
                fullWidth
                autoComplete="fname"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.username !== undefined && touched.username === true}
              />
              {errors.username && touched.username ? (
                <FormHelperText id="component-error-text">{errors.username}</FormHelperText>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="name"
                margin="dense"
                label="Nome"
                value={values.name.trim() || ''}
                fullWidth
                autoComplete="fname"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name !== undefined && touched.name === true}
              />
              {errors.name && touched.name ? (
                <FormHelperText id="component-error-text">{errors.name}</FormHelperText>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                margin="dense"
                label="Email"
                value={values.email.trim() || ''}
                fullWidth
                autoComplete="fname"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email !== undefined && touched.email === true}
              />
              {errors.email && touched.email ? (
                <FormHelperText id="component-error-text">{errors.email}</FormHelperText>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                select
                name="profile"
                label="Perfil do usuário"
                margin="dense"
                fullWidth
                value={values.profile}
                autoComplete="attrs..."
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.profile !== undefined && touched.profile === true}
                SelectProps={{
                  native: false,
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
              >
                {groups.map(({ name }, i) => (
                  <MenuItem key={i} value={name}>{name}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} container direction="row" justify="center" alignItems="center">
              <Button variant="contained" color="primary" type="submit">
                Cadastrar
             </Button>
            </Grid>
          </Grid>
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={openSnackSubmit}
            autoHideDuration={2000}
            onClose={handleCloseSnackSubmit}
          >
            <SnackBarContentWrapper
              onClose={handleCloseSnackSubmit}
              variant="success"
              message="Usuário cadastrado com sucesso"
            />
          </Snackbar>
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={openSnackErrorRequest}
            autoHideDuration={3000}
            onClose={handleCloseSnackErrorRequest}
          >
            <SnackBarContentWrapper
              onClose={handleCloseSnackErrorRequest}
              variant="warning"
              message="Usuário existente"
            />
          </Snackbar>
        </Form>
      )}
    </Formik >
  );
}

export default AddUserForm;
