import React, { useCallback, useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Form, Formik } from 'formik';
import MenuItem from '@material-ui/core/MenuItem';
import DeviceIcon from '@material-ui/icons/Memory';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { post } from 'services/api';
import { getToken } from 'services/authentication';
import * as Yup from 'yup';
import Snackbar from '@material-ui/core/Snackbar';
import SnackBarContentWrapper from 'components/SnackBarContentWrapper';

const SignupSchema = Yup.object().shape({
  templateName: Yup.string()
    .min(3, 'Nome muito curto!')
    .max(50, 'Nome muito Longo!')
    .required('É necessário informar um nome para o campo destacado'),
  attrName: Yup.string()
    .min(2, 'Nome muito curto!')
    .max(50, 'Nome muito Longo!'),
  attrType: Yup.string()
});

const types = ['Geo', 'Float', 'Integer', 'String', 'Boolean'];

const initialValues = {
  templateName: '',
  attrName: '',
  attrType: types[1],
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
  },
  attrsSpacing: {
    padding: theme.spacing(1),
    paddingLeft: '2px',
  },
  margin: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
  },
}));

const TemplateForm  = (props) => {
  const classes = useStyles();

  const [attrsForms, setAttrsForms] = useState([]);
  const [open, setOpen] = React.useState(true);
  const [openSnackSubmit, setOpenSnackSubmit] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  const handleCloseSnackSubmit = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackSubmit(false);
  }


  const handleOpenSnackSubmit = () => {
    setOpenSnackSubmit(true);
  }

  const handleOpen = () => {
    setOpen(true);
  }

  // Each time that attrForms change, this function is gonna be render the updates
  useEffect(() => { }, [attrsForms]);

  const onSubmit = useCallback(async (params, { resetForm }) => {
    try {
      const paramsToRequest = { label: params.templateName, attrs: attrsForms };
      const response = await post('/template', paramsToRequest, getToken());
      if (!response.ok) {
        return 0;
      }
      resetForm(initialValues);
      setAttrsForms([]);
      handleOpenSnackSubmit();
    } catch (e) {
      console.log("Error on submit - There's something wrong", e);
    }
  }, [attrsForms]);

  const handleTemplateAttr = (values, resetForm) => {
    if (values.attrName === '' || values.attrName === undefined) {
      return 0;
    }
    let newAttrsForms = [...attrsForms];
    newAttrsForms.push({ label: values.attrName, value_type: values.attrType, type: 'dynamic' });
    setAttrsForms(newAttrsForms);
    values.attrName = '';
    values.attrType = 'Float';
    resetForm(values);
  }

  const deleteSensorProperty = (index) => {
    let newAttrsForms = [...attrsForms];
    newAttrsForms.splice(index, 1);
    setAttrsForms(newAttrsForms);
  }

  return (
    <Formik initialValues={initialValues} validationSchema={SignupSchema} onSubmit={onSubmit}>
      {({ values, handleChange, handleBlur, errors, touched, isSubmitting, resetForm }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="templateName"
                margin="dense"
                label="Nome do template"
                value={values.templateName.trim() || ''}
                fullWidth
                autoComplete="fname"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.templateName !== undefined && touched.templateName === true}
              />
              {errors.templateName && touched.templateName ? (
                <Snackbar
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                  onExited={handleOpen}
                >
                  <SnackBarContentWrapper
                    onClose={handleClose}
                    variant="warning"
                    message={errors.templateName}
                  />
                </Snackbar>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                name="attrName"
                label="Nome do atributo"
                margin="dense"
                value={values.attrName.trim() || ''}
                fullWidth
                autoComplete="billing address-level2"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.attrName !== undefined && touched.attrName === true}
              />
              {errors.attrName && touched.attrName ? (
                <Snackbar
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                  onExited={handleOpen}
                >
                  <SnackBarContentWrapper
                    onClose={handleClose}
                    variant="warning"
                    message={errors.attrName}
                  />
                </Snackbar>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                select
                name="attrType"
                label="Tipo do atributo"
                margin="dense"
                fullWidth
                value={values.attrType}
                autoComplete="attrs..."
                onChange={handleChange}
                onBlur={handleBlur}
                SelectProps={{
                  native: false,
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
              >
                {types.map(type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={2} container direction="row" justify="flex-end" alignItems="center">
              <Fab size="small" color="secondary" variant="round" aria-label="Add" onClick={(e) => { handleTemplateAttr(values, resetForm) }}
              >
                <AddIcon />
              </Fab>
            </Grid>
            <Grid item xs={12} container direction="row" justify="center" alignItems="center">
              <Button variant="contained" color="primary" type="submit">
                Cadastrar
             </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Divider variant="middle" />
            </Grid>
          </Grid>
          {attrsForms.map((sensor, index) =>
            <Grid item xs={12} container direction="row" justify="flex-start" alignItems="center" key={index}>
              <Grid container className={classes.attrsSpacing}>
                <Grid item xs={1}>
                  <DeviceIcon />
                </Grid>
                <Grid item xs={9} >
                  <Typography color="textSecondary" >{sensor.label} - {sensor.value_type}</Typography>
                </Grid>
                <Grid item xs={2} >
                  <Button variant="contained" color="secondary" className={classes.margin} onClick={(e) => { deleteSensorProperty(index) }}>
                    <b>Deletar</b>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}
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
              message="Template cadastrado com sucesso"
            />
          </Snackbar>
        </Form>
      )}
    </Formik >
  );
}

export default TemplateForm;