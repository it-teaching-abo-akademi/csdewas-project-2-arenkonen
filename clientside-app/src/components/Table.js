import React from "react";

const Table = ( { stocks } ) => {

    
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
                            <td>{stocks.latestTime}</td>
                            <td>{stocks.companyName}</td>
                            <td>{stocks.changePercent}</td>
                            <td>{stocks.lastTradeTime}</td>
                    </tr>

            </tbody>
        </table>
    );
}

export default Table