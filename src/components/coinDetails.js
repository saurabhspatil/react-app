import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from "react-router-dom";
import {
    API_URL, LABEL_NAME, LABEL_SYMBOL, LABEL_HASHING_ALGO, LABEL_DISCRIPTION, LABEL_GENESIS_DT
} from '../constants';


export default function CoinDetails() {
    const params = useParams();
    const [modalData, setModalData] = useState({});

    const showSelectedDataDetails = () => {
        const {
            id = ''
        } = params;
        if(id !== ''){
            let url = new URL(`${API_URL}/${id}`);
            //fetch the data for individual coin
            const fetchData = async () => {
                try {
                    const response = await fetch(url);
                    const json = await response.json();
                    setModalData(json)
                } catch (error) {
                    console.log("error", error);
                }
            };
            fetchData();
        }
    }

    useEffect(() => {
        showSelectedDataDetails()
    }, [])

    

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
        <Card sx={{ margin:5 }}>
            <CardActionArea>
            <CardContent>
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
            <Grid container sx={{marginTop:2}}>
                <Typography variant="h6" component="h2">{LABEL_DISCRIPTION}:</Typography>
                <Grid item>
                    <div dangerouslySetInnerHTML={{__html: en}}/>
                </Grid>
            </Grid>
            <Typography variant="h6" component="h2" sx={{marginTop:2}}>{LABEL_GENESIS_DT}:</Typography>
                {genesis_date}
            </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    <Link to={`/`}>Back</Link>
                </Button>
            </CardActions>
        </Card>
    </>
    )
}