import React from 'react';
import '../App.css';
export default function AppHeader(props){
    const pathName = window.location.pathname;
    console.log(pathName)
    const headerLabel = pathName.includes('view-coin-details') ? 'Crypto Coin Details' : 'Crypto Coins';
    return (
        <>
        <div className="App-header">
            <header>{headerLabel}</header>
        </div>
        </>
    )
}