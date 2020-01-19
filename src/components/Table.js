import React from "react";
import Form from "./Form.js"
const APItoken = "Tpk_bb33d8b9dfec4e11b6ec94cff09d5685";

//Handles everything that has to do with the table
class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.props.rows,
            stocks: [],
            oldStocks: [],
            apifetched1: false,
            apifetched2: false,
            currentValue2: "",
            // convert is used for exchange rate it is changed in currencySelect() to 0.89 if the currency is change to Euro    
            convert: 1,
            dollar: false,
            currency: "Dollar",
            allValue: 0,
        };
        this.apiFetch = this.apiFetch.bind(this);
        this.refresh = this.refresh.bind(this);
        this.currencySelect = this.currencySelect.bind(this);
        this.totalPortfolioValue = this.totalPortfolioValue.bind(this);
    }

    //Adds a new row to the array with all the information fetched from the API
    addRows() {
        if (this.state.apifetched1 && this.state.apifetched1) {
            //.toFixed(2) rounds the numbers to display correctly as money
            var totalValue =
                (this.props.post.quantity * this.state.stocks.latestPrice * this.state.convert).toFixed(2);

            if (typeof this.state.oldStocks !== "undefined") {
                var newdata = {
                    name: this.state.stocks.symbol,
                    value: (this.state.stocks.latestPrice * this.state.convert).toFixed(2),
                    quantity: this.props.post.quantity,
                    totalPortfolioValue: totalValue,
                    purchaseValue: this.state.oldStocks.close,
                };
            //incase the input date isn't available the purchase value will be displayed as 0
            } else {
                newdata = {
                    name: this.state.stocks.symbol,
                    value: this.state.stocks.latestPrice,
                    quantity: this.props.post.quantity,
                    totalPortfolioValue: totalValue,
                    purchaseValue: "0",
                };
            }

            //concatenates the new data into the rows array which is used to build the table.
            this.setState({ rows: this.state.rows.concat(newdata) });
        }
    }
    //Adds all information to the correct cell in the table in the current row with the array.map 
    rows() {
        return this.state.rows.map((row, i) => {
            return (
                <tr key={i}>
                    <td>{row.name}</td>
                    <td>{(row.value)}</td>
                    <td>{row.quantity}</td>
                    <td>{(row.quantity*row.value).toFixed(2)}</td>
                    <td>{row.purchaseValue}</td>
                    {/* Adds a button to each row with the current row's key to be able to remove the row */}
                    <td><button onClick={() => {this.removeRow({i})}}>Remove Row</button></td>
                </tr>
            );
        });
    }
    //Does two API fetches, one for current data and one for historical data, these are applied to the initial version of the table
    apiFetch() {
        fetch(
            "https://sandbox.iexapis.com/beta/stock/" +
                this.props.post.name +
                "/quote/?token=" +
                APItoken +
                "&period=annual"
        )
            .then(res => res.json())
            .then(data => {
                this.setState({ stocks: data }, () => {
                    this.setState({ apifetched1: true });
                });
            })
            .catch(console.log);
        
            /*Purchasedate is directly input into the API fetch rather than being checked to see if it is correct, 
            this can lead to no data being gain from this API call.*/
        fetch(
            "https://sandbox.iexapis.com/stable/stock/" +
                this.props.post.name +
                "/chart/date/" +
                this.props.post.purchasedate +
                "?chartByDay=true&token=" +
                APItoken +
                "&period=annual"
        )
            .then(res => res.json())
            .then(data => {
                this.setState({ oldStocks: data[0] }, () => {
                    this.setState({ apifetched2: true });
                    this.addRows();
                });
            })
            .catch(console.log);
    }
  
    //Does a API call to update the current value of all stocks in a table
    async refresh(){
        this.setState({allValue:0})
        //For-loop is used here because array.map didn't work for some reason
        for (var i=0; i< this.state.rows.length; i++){
            await fetch( 
                "https://sandbox.iexapis.com/beta/stock/" +this.state.rows[i].name+"/quote/?token=" + APItoken +"&period=annual")
                .then(res => res.json())
                .then(data =>{
                    this.setState({ currentValue2: data }, () => {
                        this.state.rows[i].value = (this.state.currentValue2.latestPrice * this.state.convert).toFixed(2);
                        this.state.rows[i].totalValue = (this.state.currentValue2.latestPrice * this.state.rows[i].quantity * this.state.convert).toFixed(2);
                        this.totalPortfolioValue();                    
                    });
                })
                .catch(console.log);
        }
    }

    //Changes the convert amount between euro and dollar then calls refresh to update the table
    currencySelect(){
        if (this.state.dollar){
            this.setState({convert: 1, dollar: false, currency: "Dollar" },
                () => {this.refresh()});
        }
        else{
            this.setState({convert:0.89, dollar: true, currency: "Euro"}, 
                () => {this.refresh()});
        }
       
    }
    //Splices the selected row to remove it from the array of rows. 
    removeRow(i){         
        var rows = [...this.state.rows];
        rows.splice(i.i, 1);
        this.setState({rows});
    }


    //Calculates the value of all stocks based on the totalValue
    totalPortfolioValue(){
        this.setState({allValue:0});
        var tempValue;
        return this.state.rows.map((row, i) => {
            tempValue = parseFloat(row.totalValue)
            if(typeof tempValue === "number"){
                    this.setState({allValue:this.state.allValue+tempValue})              
            }
            
        });        
    }

    //Renders a table with an API lookup if buttonPressed === True, otherwise without the API lookup
    //buttonPressed === True when the Add Stock button has been pressed, and a new stock is added to the table
    render() {
        if (this.props.buttonPressed) {
            return (
                <div className="stock-table">
                    {this.apiFetch()}
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Value</th>
                                <th>Quantity</th>
                                <th>Total Value</th>
                                <th>Purchase Value</th>
                                <th>Number</th>
                            </tr>
                        </thead>
                        <tbody>{this.rows()}</tbody>
                    </table>
                </div>
            );
        } else
            return (
                <div className="stock-table">
                    <button onClick={this.refresh}>Refresh</button>
                    <button onClick={this.currencySelect}>Switch currency</button>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Value</th>
                                <th>Quantity</th>
                                <th>Total Value</th>
                                <th>Purchase Value</th>
                                <th>Number</th>
                            </tr>
                        </thead>
                        <tbody>{this.rows()}</tbody>
                    </table>
                    <h3>Currency:{this.state.currency}</h3>
                    <h3>Total Value of all stocks: {this.state.allValue.toFixed(2)}</h3>
                </div>
            );
    }
}   

class StockTables extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            post: {
                name: "",
                quantity: null,
                purchasedate: ""
            },
            rows:[],
            buttonPressed: false
        }
        this.handleInputChange =this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = e => {
        const { name, value } = e.target;
    
        this.setState(prevState => ({
          post: { ...prevState.post, [name]: value }
        }));
      };
 
    
    handleSubmit(event){
        event.preventDefault();
        this.setState({buttonPressed: true});
    }

    buttonreset(){
        if(this.state.buttonPressed){
            this.setState({buttonPressed: false});
        }
        
    }
    //Handles the stock input form and stock table
    render() {
        return (   
            <div className="App">
                <Form 
                    handleChange = {this.handleChange}
                    post={this.state.post}
                    handleSubmit={this.handleSubmit}
                />
                <Table
                    post = { this.state.post } 
                    quantity = {this.state.post.quantity} 
                    oldStocks = {this.state.oldStocks}
                    rows = {this.state.rows}
                    buttonPressed = {this.state.buttonPressed} />
                {this.buttonreset()}
            </div>
        );
    }
}

export default StockTables