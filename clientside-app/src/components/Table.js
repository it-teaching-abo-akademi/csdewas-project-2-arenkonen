import React from "react";
import Form from "./Form.js"
const APItoken = "Tpk_bb33d8b9dfec4e11b6ec94cff09d5685";
class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.props.rows,
            stocks: [],
            oldStocks: [],
            apifetched1: false,
            apifetched2: false,
            currentValue2: ""
        };
        this.apiFetch = this.apiFetch.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    addRows() {
        if (this.state.apifetched1 && this.state.apifetched1) {
            var totalValue =
                this.props.post.quantity * this.state.stocks.latestPrice;

            if (typeof this.state.oldStocks !== "undefined") {
                var newdata = {
                    name: this.state.stocks.symbol,
                    value: this.state.stocks.latestPrice,
                    quantity: this.props.post.quantity,
                    totalValue: totalValue,
                    purchaseValue: this.state.oldStocks.close,
                };
            } else {
                newdata = {
                    name: this.state.stocks.symbol,
                    value: this.state.stocks.latestPrice,
                    quantity: this.props.post.quantity,
                    totalValue: totalValue,
                    purchaseValue: "0",
                };
            }

            console.log(newdata);
            this.setState({ rows: this.state.rows.concat(newdata) });
        }
    }

    rows() {
        return this.state.rows.map((row, i) => {
            return (
                <tr key={i}>
                    <td>{row.name}</td>
                    <td>{row.value}</td>
                    <td>{row.quantity}</td>
                    <td>{row.totalValue}</td>
                    <td>{row.purchaseValue}</td>
                    <td><button onClick={() => {this.removeRow({i})}}>Remove Row</button></td>
                </tr>
            );
        });
    }
    //Does two API fetches, one for current data and one for historical data, these are applied to the initial version of the table
    apiFetch() {
        console.log(this.props.post.name);
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
        console.log(
            "https://sandbox.iexapis.com/stable/stock/" +
                this.props.post.name +
                "/chart/date/" +
                this.props.post.purchasedate +
                "?chartByDay=true&token=" +
                APItoken +
                "&period=annual"
        );
        console.log(
            "https://sandbox.iexapis.com/beta/stock/" +
                this.props.post.name +
                "/quote/?token=" +
                APItoken +
                "&period=annual"
        );
    }

    currentValueFetch(refreshName) {
        console.log(refreshName);
        console.log(
            "https://sandbox.iexapis.com/beta/stock/" +
                refreshName +
                "/quote/?token=" +
                APItoken +
                "&period=annual"
        );
    }
    //Does a API call to update the current value of all stocks in a table
    refresh() {
        return this.state.rows.map((row, index) => {
            return fetch(
                "https://sandbox.iexapis.com/beta/stock/" +row.name+"/quote/?token=" +APItoken +"&period=annual")
                .then(res => res.json())
                .then(data => {
                    this.setState({ currentValue2: data }, () => {
                        console.log(this.state.currentValue2.latestPrice);
                        this.state.rows[index].value = this.state.currentValue2.latestPrice;
                    });
                })
                .catch(console.log);
        });
    }

    removeRow(i){         
        var rows = [...this.state.rows];
        console.log(i)
        rows.splice(i.i, 1);
        this.setState({rows});
    }
    //Renders a table with an API lookup if buttonPressed === True, otherwise without the API lookup
    render() {
        if (this.props.buttonPressed) {
            return (
                <div className="stock-table">
                    {this.apiFetch()}
                    {/* {this.addRows()} */}
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