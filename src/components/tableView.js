import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import {
    API_URL, LABEL_NAME, LABEL_SYMBOL, LABEL_CURRENT_PRICE, LABEL_HIGH_24_HRS_PRICE, LABEL_LOW_24_HRS_PRICE, CSS_RIGHT,
    LABEL_HASHING_ALGO, LABEL_DISCRIPTION, LABEL_GENESIS_DT
} from '../constants';

const columns = [
  { id: 'image', label: '', minWidth: 30 },
  { id: 'name', label: LABEL_NAME, minWidth: 100 },
  { id: 'symbol', label: LABEL_SYMBOL, minWidth: 30 },
  { id: 'current_price', label: LABEL_CURRENT_PRICE, minWidth: 170, align: CSS_RIGHT},
  { id: 'high_24h', label: LABEL_HIGH_24_HRS_PRICE, minWidth: 170, align: CSS_RIGHT},
  { id: 'low_24h', label: LABEL_LOW_24_HRS_PRICE, minWidth: 170, align: CSS_RIGHT},
];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function StickyHeadTable(props={}) {
    
    const [page, setPage] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [open, setOpen] = useState(false);
    const [selectedID, setID] = useState('');
    const [modalData, setModalData] = useState({})
    const handleClose = () => setOpen(false);

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

  const showSelectedDataDetails = (info) => {
    const {
        id = ''
    } = info;
    if(id !== selectedID){
        let url = new URL(`${API_URL}/${id}`);
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                console.log(json);
                setID(id);
                setModalData(json);
                setOpen(true);
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData();
    }else{
        setOpen(true);
    }
  }

  const {
    tableData = []
  } = props;;
  
  const {
    name = '',
    symbol = '',
    hashing_algorithm = '',
    description: {
        en = ''
    } = {},
    genesis_date = ''
  } = modalData;

  return (
    <>
    <Grid item xs={'auto'}>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 700 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" 
                    tabIndex={-1} 
                    key={row.id}
                    onClick={() => showSelectedDataDetails(row)}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column?.id === 'image'
                            ? renderImage(row)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
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
      />
    </Paper>
    </Grid>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Grid container spacing={3}>
                <Grid item xs>
                    <Typography variant="h6" component="h2">{LABEL_NAME}: </Typography>
                    {name}
                </Grid>
                <Grid item xs>
                    <Typography variant="h6" component="h2">{LABEL_SYMBOL}: </Typography>
                    {symbol}
                </Grid>
                <Grid item xs>
                    <Typography variant="h6" component="h2">{LABEL_HASHING_ALGO}: </Typography>
                    {hashing_algorithm}
                </Grid>
            </Grid>
            <Grid container>
                <Typography variant="h6" component="h2">{LABEL_DISCRIPTION}:</Typography>
                <Grid item>
                    <div dangerouslySetInnerHTML={{__html: en}}/>
                </Grid>
            </Grid>
            <Typography variant="h6" component="h2">
              {LABEL_GENESIS_DT}:
            </Typography>
            {genesis_date}
        </Box>
      </Modal>
    </>
  );
}
