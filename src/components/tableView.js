import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import {
    API_URL, LABEL_NAME, LABEL_SYMBOL, LABEL_CURRENT_PRICE, LABEL_HIGH_24_HRS_PRICE, LABEL_LOW_24_HRS_PRICE, CSS_RIGHT
} from '../constants';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#f16c6c',
    color: theme.palette.common.white,
    fontSize: 18,
    fontWeight: 'bold'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

//create columns
const columns = [
  { id: 'image', label: '', width: 30},
  { id: 'name', label: LABEL_NAME, minWidth: 100 },
  { id: 'symbol', label: LABEL_SYMBOL, minWidth: 30 },
  { id: 'current_price', label: LABEL_CURRENT_PRICE, minWidth: 170, align: CSS_RIGHT},
  { id: 'high_24h', label: LABEL_HIGH_24_HRS_PRICE, minWidth: 170, align: CSS_RIGHT},
  { id: 'low_24h', label: LABEL_LOW_24_HRS_PRICE, minWidth: 170, align: CSS_RIGHT},
];

export default function StickyHeadTable(props={}) {
    
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [selectedID, setID] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const renderImage = (data) => {
    return <img src={data?.image} alt={data?.name} width={'30'} height={'30'}/>
  }

  const renderLink = (data, column, row) => {
    return <>{ column?.id === 'name' ? <Link to={`/view-coin-details/${row.id}`}>{data}</Link> : data }</>
  }
  const showSelectedDataDetails = (info) => {
    const {
        id = ''
    } = info;
    if(id !== selectedID){
        let url = new URL(`${API_URL}/${id}`);
        //fetch the data for individual coin
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setID(id);
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData();
    }
  }

  const {
    tableData = []
  } = props;
  
  return (
    <>
    <Grid item xs={'auto'}>
    <Paper sx={{ overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: '80vh', margin: 2, width: '98%'}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <StyledTableRow hover role="checkbox" 
                    tabIndex={-1} 
                    key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <StyledTableCell key={column.id} align={column.align}>
                          {column?.id === 'image'
                            ? renderImage(row)
                            : renderLink(value, column, row)}
                        </StyledTableCell>
                      );
                    })}
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ margin: 2}}
      />
    </Paper>
    </Grid>
    </>
  );
}
