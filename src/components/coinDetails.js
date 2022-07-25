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
                    <Typography variant="h6" component="h2" style={{fontWeight: "700"}}>{LABEL_NAME}: <span style={{fontWeight: "normal"}}>{name}</span></Typography>
                </Grid>
                <Grid item xs>
                    <Typography variant="h6" component="h2" style={{fontWeight: "700"}}>{LABEL_SYMBOL}: <span style={{fontWeight: "normal"}}>{symbol}</span></Typography>
                </Grid>
                <Grid item xs>
                    <Typography variant="h6" component="h2" style={{fontWeight: "700"}}>{LABEL_HASHING_ALGO}: <span style={{fontWeight: "normal"}}>{hashing_algorithm}</span>
                    </Typography>
                </Grid>
            </Grid>
            <Grid container sx={{marginTop:2}}>
                <Typography variant="h6" component="h2" style={{fontWeight: "700"}}>{LABEL_DISCRIPTION}:</Typography>
                <Grid item>
                    <div style={{fontSize: "14"}} dangerouslySetInnerHTML={{__html: en}}/>
                </Grid>
            </Grid>
            <Typography variant="h6" component="h2" sx={{marginTop:2}} style={{fontWeight: "700"}}>{LABEL_GENESIS_DT}: 
                <span style={{fontWeight: "normal"}}> {genesis_date}</span>
            </Typography>
            </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="medium" variant="contained" href="#contained-buttons" className="white-color">
                    <Link to={`/`}>Back</Link>
                </Button>
            </CardActions>
        </Card>
    </>
    )
}