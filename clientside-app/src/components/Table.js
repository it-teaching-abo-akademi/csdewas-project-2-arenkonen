import React from "react";

const Table = ( { stocks, quantity, purchasedate } ) => {

    const totalValue = quantity * stocks.latestPrice;
    
    return (
        <table id="stocks">
            <thead id="stocks">
                <tr id="stocks">
                    <th id="stocks">Name</th>
                    <th>Value</th>
                    <th>Quantity</th>
                    <th>Total Value</th>
                    <th>Purchase Value</th>
                    <th>Select</th>
                </tr>
            </thead> 
            <tbody>
                        <tr key={stocks.symbol}>
                            <td>{stocks.symbol}</td>
                            <td>{stocks.latestPrice}</td>
                            <td>{quantity}</td>
                            <td>{totalValue}</td>
                            <td>{purchasedate}</td>
                            <td>{stocks.lastTradeTime}</td>
                    </tr>

            </tbody>
        </table>
    );
}

export default Table