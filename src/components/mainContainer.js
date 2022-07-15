import React, { useState, useEffect } from 'react';
import TableView from './tableView';
import {
    API_URL, COINS_MARKET, EUR_CURR
} from '../constants';
const AppContainer = () => {

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        let url = new URL(`${API_URL}${COINS_MARKET}`);
        let params = {
            vs_currency: EUR_CURR, 
            order: 'market_cap_desc',
            per_page: 20,
            page: 1,
            sparkline: false
        };
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setTableData(json);
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
        {tableData.length &&
            <TableView
                tableData={tableData}
            />
        }
            
        </>
    )
}

export default AppContainer;
