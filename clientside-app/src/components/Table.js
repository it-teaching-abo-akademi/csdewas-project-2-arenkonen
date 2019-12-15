import React from "react";

/* const APIToken = "Tpk_bb33d8b9dfec4e11b6ec94cff09d5685"; */

const Table = ( { stocks, quantity, purchasedate, oldStocks} ) => {
    var totalValue = quantity * stocks.latestPrice;
    /* var oldStocks = oldDateApiCall(stocks.symbol, purchasedate); 
     */
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
                            <td>{oldStocks.close}</td>
                            <td>{stocks.lastTradeTime}</td>
                    </tr>

            </tbody>
        </table>
    );
}

/* function oldDateApiCall(name, purchasedate){
    var oldStocks = []; 
    fetch("https://sandbox.iexapis.com/stable/stock/"+ name +"/chart/date/"+ purchasedate +"?chartByDay=true?token="+ APIToken +"&period=annual")
        .then(res => res.json())
        .then((data) => {
          this.setState({ oldStocks: data })
        })
        .catch(console.log)
    return oldStocks;
} */


export default Table