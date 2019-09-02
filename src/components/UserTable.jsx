import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { get, remove } from 'services/api';
import { getToken } from 'services/authentication';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from "react-router";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import PencilIcon from '@material-ui/icons/Create';

const headRows = [
  { id: 'user', numeric: false, disablePadding: false, label: 'Usuário' },
  { id: 'name', numeric: true, disablePadding: false, label: 'Nome' },
  { id: 'email', numeric: true, disablePadding: false, label: 'Email' },
  { id: 'profile', numeric: true, disablePadding: false, label: 'Perfil' },
  { id: 'tenant', numeric: true, disablePadding: false, label: 'Tenant' },
];

const desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const getSorting = (order, orderBy) => {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const EnhancedTableHead = (props) => {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headRows.map(row => (
          <TableCell
            key={row.id}
            align={row.numeric ? 'right' : 'left'}
            padding={row.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
              {orderBy === row.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected, selected } = props;

  const handleDeleteClick = () => {
    try {
      const url = '/auth/user/' + selected + '';
      const response = remove(url, getToken());
      if (!response.ok && response.status === 400) {
        console.error("Error on request - There's something wrong", response.status);
        return 0;
      }
      props.updateTable(selected);
    } catch (e) {
      console.error("Error on submit - There's something wrong", e);
    }
  }

  const handleChangeInput = (e) => {
    props.filterTable(e.currentTarget.value);
  }

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
            <Typography variant="h6" id="tableTitle">
              Usuários do sistema
            </Typography>
          )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <div>
            <Grid container>
              <Grid item xs={6}>
                <IconButton aria-label="Deletar" onClick={handleDeleteClick}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
              <Grid item xs={6}>
                <IconButton aria-label="Editar">
                  <PencilIcon />
                </IconButton>
              </Grid>
            </Grid>
          </div>
        ) : (
            <Tooltip title="Filter list">
              <TextField
                id="standard-search"
                label="Pesquisar"
                className={classes.textField}
                margin="normal"
                onChange={(e) => { handleChangeInput(e) }}
                InputProps={{
                  endAdornment: <SearchIcon />
                }}
              />
            </Tooltip>
          )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  fixAddBUttonRight: {
    marginLeft: 'auto',
  },
}));

const UserTable = (props) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = useState([]);
  const [rowsFiltered, setRowsFiltered] = useState([]);

  useEffect(() => {
    // componentDidMount(), componentDidUpdate()
    try {
      const url = '/auth/user';
      const response = get(url, getToken());
      response.then(response => response.json())
        .then(data => {
          setRows(data.users);
          setRowsFiltered(data.users);
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
    []);

  const redirectToAddPage = () => {
    props.history.push('/user/new');
  }

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

  const handleClick = (event, id) => {
    // This condition is responsible to allow just one item to be selected
    if (selected.length > 0 && (selected.filter(obj => obj === id) < 1)) {
      return 0;
    }
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  const updateTable = (id_user) => {
    const id = id_user;
    var rows_updated = rows.filter(obj => {
      return obj.id !== String(id);
    })
    setRows(rows_updated);
    setRowsFiltered(rows_updated);
    setSelected([]);
  }

  const filterTable = (filter) => {
    let updatedList = rows;
    updatedList = updatedList.filter(function (item) {
      return item.name.toLowerCase().search(filter.toLowerCase()) !== -1 || item.email.toLowerCase().search(filter.toLowerCase()) !== -1;
    });
    setRowsFiltered(updatedList);
  }

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rowsFiltered.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length}
          selected={selected} updateTable={(id_user) => updateTable(id_user)}
          filterTable={(filter) => filterTable(filter)} />
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rowsFiltered.length}
            />
            <TableBody>
              {stableSort(rowsFiltered, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.username}</TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">{row.profile}</TableCell>
                      <TableCell align="right">{row.service}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rowsFiltered.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <Grid container direction="row" justify="flex-end" alignItems="center">
        <Fab size="large" color="secondary" variant="round" aria-label="Add" className={classes.fixAddBUttonRight} onClick={redirectToAddPage}>
          <AddIcon />
        </Fab>
      </Grid>
    </div>
  );
}

export default withRouter(UserTable);
