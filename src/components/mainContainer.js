import React, { useState, useEffect } from 'react';
import TableView from './tableView';
import CircularProgress from '@mui/material/CircularProgress';
import {
    API_URL, COINS_MARKET, EUR_CURR, MARKET_CAP_DESC
} from '../constants';

const AppContainer = () => {
    const [tableData, setTableData] = useState([]); //this state is used to maintain data for table

    useEffect(() => {
        let url = new URL(`${API_URL}${COINS_MARKET}`); //API URL
        let params = {
            vs_currency: EUR_CURR, 
            order: MARKET_CAP_DESC,
            per_page: 20,
            page: 1,
            sparkline: false
        };
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        //fetch method to ftech data from server
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setTableData(json);// data is stored in state
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
        {tableData?.length ?
            <TableView
                tableData={tableData}
            /> : <CircularProgress color="inherit" />
        }
        </>
    )
}

export default AppContainer;
