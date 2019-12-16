import React from "react";


const TableConst = ( { stocks, quantity, purchasedate, oldStocks} ) => {
    if (quantity!== null){
        var totalValue = quantity * stocks.latestPrice;
    
       /*  var newdata = {name:stocks.symbol, 
                    value:stocks.latestPrice, 
                    quantity:quantity, 
                    totalValue:totalValue,
                    purchaseValue:oldStocks.close,
                    select:stocks.lastTradeTime}
        
        <tableClass data:newdata />; */
        
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
    else return null
}

class Table extends React.Component {
    constructor(props){
        super(props);
        this.state={
            rows:this.props.rows
        }
    }

    addRows(){
        if(this.props.buttonPressed){

            var totalValue = this.props.quantity * this.props.stocks.latestPrice
            if(typeof this.props.oldStocks !== "undefined"){
                var newdata = {
                    name:this.props.stocks.symbol, 
                    value:this.props.stocks.latestPrice, 
                    quantity:this.props.quantity, 
                    totalValue:totalValue,
                    purchaseValue:this.props.oldStocks.close,
                    select:this.props.stocks.lastTradeTime};
            }
            else {
                var newdata = {
                    name:this.props.stocks.symbol, 
                    value:this.props.stocks.latestPrice, 
                    quantity:this.props.quantity, 
                    totalValue:totalValue,
                    purchaseValue:"0",
                    select:this.props.stocks.lastTradeTime};
            }
           
            
            this.setState({rows: this.state.rows.concat(newdata)});
    }
    }
    rows(){
        
        return this.state.rows.map((row,index) =>{
            return (
            <tr key={index}>
                <td>{row.name}</td>
                <td>{row.value}</td>
                <td>{row.quantity}</td>
                <td>{row.totalValue}</td>
                <td>{row.purchaseValue}</td>
                <td>{row.select}</td>
            </tr>);
        });
    }
    
    render(){
        if (this.props.quantity!== null){
    return(    
            
        <div>
        {this.addRows()}
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
            {this.rows()}

            </tbody>
        </table>
        </div>
    )}
    else return null;
}

}

/* function addRow(){
    return this.state.tablerows.map(function(row,i){
        return (<tr key={row.name}>
            <td>{row.name}</td>
            <td>{row.value}</td>
            <td>{row.quantity}</td>
            <td>{row.totalValue}</td>
            <td>{row.purchaseValue}</td>
            <td>{row.select}</td>)
            </tr>);
    });
} */

export default Table