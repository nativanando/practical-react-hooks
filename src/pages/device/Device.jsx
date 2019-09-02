import Layout from 'layouts/Authenticated';
import React, { useEffect, useState } from 'react';
import Pagination from 'components/Paginate';
import Footer from 'components/Footer';
import { get } from 'services/api';
import { getToken } from 'services/authentication';
import GridList from 'components/Grid';
import DeviceCard from 'components/DeviceCard';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fixAddBUttonRight: {
    marginLeft: 'auto',
    marginRight: 35,
  },
}));

const Device = (props) => {
  const classes = useStyles();

  const [devices, setDevices] = useState([]);
  const [pagination, setPagination] = useState({ has_next: null, next_page: 2, page: 1, total: null });
  const [page_size] = useState(16);

  const redirectToAddPage = () => {
    props.history.push('/device/new');
  }

  useEffect(() => {
    // componentDidMount(), componentDidUpdate()
    try {
      const url = '/device?page_size=' + page_size + '&page_num=' + pagination.page + '';
      const response = get(url, getToken());
      response.then(response => response.json())
        .then(data => {
          setDevices(data.devices);
          setPagination(data.pagination);
        });
    } catch (e) {
      console.error("Error on submit - There's something wrong", e);
    }

    return () => {
      // will unmount
      return 0;
    }
    // effect dependency array
  },
    [pagination.page, page_size]);

  const updatePagination = (newPage) => {
    setPagination(prevPagination => ({
      ...prevPagination,
      page: newPage
    }))
  }

  if (devices.length > 0) {
    return (
      <Layout greeting="Dispositivos">
        <GridList>
          <DeviceCard cards={devices} />
          <Footer>
            <Pagination totalItens={pagination.total} rowsPerPage={page_size} updatePage={(newPage) => updatePagination(newPage)} />
          </Footer>
          <Fab size="large" color="secondary" variant="round" aria-label="Add" className={classes.fixAddBUttonRight} onClick={redirectToAddPage}>
            <AddIcon />
          </Fab>
        </GridList>
      </Layout>
    );
  } else {
    return (
      <Layout greeting="Dispositivos">

      </Layout>
    );
  }
};

export default Device;