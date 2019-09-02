import Layout from 'layouts/Authenticated';
import React, { useState, useEffect } from 'react';
import { getToken } from 'services/authentication';
import { get } from 'services/api';
import GridList from 'components/Grid';
import Pagination from 'components/Paginate';
import Footer from 'components/Footer';
import Fab from '@material-ui/core/Fab';
import TemplateCard from 'components/TemplateCard';
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

const Template = (props) => {
  const classes = useStyles();
  
  const [templates, setTemplates] = useState([]);
  const [pagination, setPagination] = useState({ has_next: null, next_page: 2, page: 1, total: null });
  const [page_size] = useState(12);

  const redirectToAddPage = () => {
    props.history.push('/template/new');
  };

  useEffect(() => {
    // componentDidMount(), componentDidUpdate()
    try {
      const url = '/template?page_size=' + page_size + '&page_num=' + pagination.page + '';
      const response = get(url, getToken());
      response.then(response => response.json())
        .then(data => {
          // Adding a new property called detail to templates. It's responsible to control the details of the flow on the card.
          data.templates = data.templates.map(template => ({ ...template, detail: false }))
          setTemplates(data.templates);
          setPagination(data.pagination);
        });
    } catch (e) {
      console.error("Error on submit - There's something wrong", e);
    }
    // effect dependency array
  }, [page_size, pagination.page]);

  function updatePagination(newPage) {
    setPagination(prevPagination => ({
      ...prevPagination,
      page: newPage
    }))
  }

  if (templates.length > 0) {
    return (
      <Layout greeting="Templates">
        <GridList>
          <TemplateCard cards={templates} />
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
      <Layout greeting="Templates"></Layout>
    );
  }
};

export default Template;