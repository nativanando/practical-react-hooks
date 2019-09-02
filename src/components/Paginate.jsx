import React from 'react';
import TablePagination from '@material-ui/core/TablePagination';

const Pagination = (props) => {
  const [activePage, setActivePage] = React.useState(0);

  const handlePageChange = (event, newPage) => {
    setActivePage(newPage);
    props.updatePage(newPage + 1);
  }

  const handleChangeRowsPerPage = (event) => {
    setActivePage(0);
  }

  return (
    <TablePagination
      rowsPerPageOptions={[props.rowsPerPage]}
      colSpan={3}
      count={props.rowsPerPage * props.totalItens}
      rowsPerPage={props.rowsPerPage}
      page={activePage}
      component="div"
      labelRowsPerPage='Itens por página'
      SelectProps={{
        inputProps: { 'aria-label': 'Itens por página' },
        native: true,
      }}
      onChangePage={handlePageChange}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default Pagination;