import React, { useCallback, useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Form, Formik } from 'formik';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { getToken } from 'services/authentication';
import * as Yup from 'yup';
import Snackbar from '@material-ui/core/Snackbar';
import SnackBarContentWrapper from 'components/SnackBarContentWrapper';
import { get } from 'services/api';
import TemplateIcon from '@material-ui/icons/FileCopy';
import ScrollDialog from 'components/ModalDevice';
import { post } from 'services/api';

const SignupSchema = Yup.object().shape({
  deviceName: Yup.string()
    .min(3, 'Nome muito curto!')
    .max(50, 'Nome muito Longo!')
    .required('É necessário informar um nome para o campo destacado'),
  template: Yup.string()
});

const initialValues = {
  deviceName: '',
  template: '',
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

const DeviceForm = (props) => {
  const classes = useStyles();

  const [attrsForms, setAttrsForms] = useState([]);
  const [open, setOpen] = useState(true);
  const [openSnackSubmit, setOpenSnackSubmit] = useState(false);
  const [openSnackTemplateAlreadyDone, setOpenSnackTemplateAlreadyDone] = useState(false);
  const [openSnackErrorRequest, setOpenSnackErrorRequest] = useState(false);
  const [page_size] = useState(100);

  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    // componentDidMount(), componentDidUpdate()
    try {
      const url = '/template?page_size=' + page_size + '';
      const response = get(url, getToken());
      let template_parsed = [];
      response.then(response => response.json())
        .then(data => {
          Object.keys(data.templates).map(function (key, index) {
            let values = {
              template_id: data.templates[key].id,
              template_label: data.templates[key].label,
              devices: []
            };
            values.devices = Object.keys(data.templates[key].attrs).map(function (key_atts, index) {
              return data.templates[key].attrs[key_atts].label;
            });
            template_parsed.push(values);
            return 0;
          });
          // Adding a new property called detail to templates. It's responsible to controle the details flow on the card.
          setTemplates(template_parsed);
        });
    } catch (e) {
      console.error("Error on submit - There's something wrong", e);
    }
    // effect dependency array
  }, [page_size]);

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

  const handleCloseSnackTemplate = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackTemplateAlreadyDone(false);
  }

  const handleCloseSnackErrorRequest = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackErrorRequest(false);
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const onSubmit = useCallback(async (params, { resetForm }) => {
    try {
      const paramsToRequest = { label: params.deviceName, templates: attrsForms };
      const response = await post('/device', paramsToRequest, getToken());
      if (!response.ok && response.status === 400) {
        setOpenSnackErrorRequest(true);
        return 0;
      }
      resetForm(initialValues);
      setAttrsForms([]);
      setOpenSnackSubmit(true);
    } catch (e) {
      console.log("Error on submit - There's something wrong", e);
    }
  }, [attrsForms]);

  const handleDeviceAttr = (values, resetForm) => {
    if (values.template === '' || values.template === undefined) {
      return 0;
    }

    let newAttrsForms = [...attrsForms];
    let obj = newAttrsForms.filter(attr => (attr === values.template));

    if (obj.length > 0) {
      setOpenSnackTemplateAlreadyDone(true);
      return 0;
    }
    newAttrsForms.push(values.template);
    setAttrsForms(newAttrsForms);
    values.template = '';
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
                name="deviceName"
                margin="dense"
                label="Nome do dispositivo"
                value={values.deviceName.trim() || ''}
                fullWidth
                autoComplete="fname"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.deviceName !== undefined && touched.deviceName === true}
              />
              {errors.deviceName && touched.deviceName ? (
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
                    message={errors.deviceName}
                  />
                </Snackbar>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                select
                name="template"
                label="Adicione um Template"
                margin="dense"
                fullWidth
                value={values.template}
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
                {templates.map((template, index) =>
                  <MenuItem key={index} value={template.template_id}>{template.template_id} - {template.template_label}</MenuItem>
                )}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={2} container direction="row" justify="flex-end" alignItems="center">
              <Fab size="small" color="secondary" variant="round" aria-label="Add" onClick={(e) => { handleDeviceAttr(values, resetForm) }}
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
          {attrsForms.map((values, index) =>
            <Grid item xs={12} container direction="row" justify="flex-start" alignItems="center" key={index}>
              <Grid container className={classes.attrsSpacing}>
                <Grid item xs={12} sm={1} md={1} lg={1}>
                  <TemplateIcon />
                </Grid>
                <Grid item xs={12} sm={5} md={4} lg={5}>
                  <Typography color="textSecondary" className={classes.bottomAlign} >Número do template: <b>{values}</b></Typography>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <ScrollDialog object={templates.filter(obj => (obj.template_id === values))} title='Sensores do Template' />
                </Grid>
                <Grid item xs={12} sm={2} md={3} lg={2}>
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
              message="Dispositivo cadastrado com sucesso"
            />
          </Snackbar>
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={openSnackTemplateAlreadyDone}
            autoHideDuration={1000}
            onClose={handleCloseSnackTemplate}
          >
            <SnackBarContentWrapper
              onClose={handleCloseSnackTemplate}
              variant="warning"
              message="Template já selecionado!"
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
              message="Templates possuem sensores duplicados"
            />
          </Snackbar>
        </Form>
      )}
    </Formik >
  );
}

export default DeviceForm;
