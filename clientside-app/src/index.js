import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Table from "./components/Table.js";
import Form from "./components/Form.js";

/* TODO:
When submitting Form add new row to Table
Add table to a portfolio
Remove row from Table
Make portfolios addable and removable
Make Graph show
 */
/* 
https://sandbox.iexapis.com/beta/stock/AAPL/quote/?token=Tpk_bb33d8b9dfec4e11b6ec94cff09d5685&period=annual */

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: [],
            post: {
                name: "",
                quantity: null,
                purchasedate: ""
            },
            datum: [],
            oldStocks: [],
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

        fetch("https://sandbox.iexapis.com/beta/stock/"+ this.state.post.name +"/quote/?token="+ APItoken +"&period=annual")
        .then(res => res.json())
        .then((data) => {
          this.setState({ stocks: data })
        })
        .catch(console.log)

        fetch("https://sandbox.iexapis.com/stable/stock/"+ this.state.post.name +"/chart/date/"+ this.state.post.purchasedate +"?chartByDay=true&token="+ APItoken +"&period=annual")
        .then(res => res.json())
        .then((data) => {
          this.setState({ oldStocks: data[0] })
        })
        .catch(console.log)

        this.setState({buttonPressed: true});
        
        console.log("https://sandbox.iexapis.com/stable/stock/"+ this.state.post.name +"/chart/date/"+ this.state.post.purchasedate +"?chartByDay=true&token="+ APItoken +"&period=annual");
        console.log("https://sandbox.iexapis.com/beta/stock/"+ this.state.post.name +"/quote/?token="+ APItoken +"&period=annual");
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
                    stocks = { this.state.stocks } 
                    quantity = {this.state.post.quantity} 
                    oldStocks = {this.state.oldStocks}
                    rows = {this.state.rows}
                    buttonPressed = {this.state.buttonPressed} />
                    {this.buttonreset()}
            </div>
        );
    }
}
export default App;

function table(props){
    return(            
        <div>
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
            </tbody>
        </table>
        </div>
    )
}
/*
Click button -> Add Row -> Get API -> Add to Row 
*/


function addRows(props){
    var newdata = {name:props.stocks.symbol, 
        value:props.stocks.latestPrice, 
        quantity:props.quantity, 
        totalValue:props.totalValue,
        purchaseValue:props.oldStocks.close,
        select:props.stocks.lastTradeTime};
    
    this.setState({rows: this.state.rows.concat(newdata)});
}   
function rows(){
    return this.state.rows.map((row,index) =>{
        return (
        <tr key={index}>
            <td>{row.name}</td>
            <td>{row.value}</td>
            <td>{row.quantity}</td>
            <td>{row.totalValue}</td>
            <td>{row.purchaseValue}</td>
            <td>{row.select}</td>)
        </tr>);
    });
}
/* class Form extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            quantity: 0,
            purchasedate: ""
        };

        this.handleInputChange =this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
          });
    }

   

    render(){
        return (
            <form onSubmit= {this.handleSubmit}>
                <label>
                    Stock name:
                    <input name="name" type="text" value={this.state.name} onChange={this.handleInputChange} />
                </label>
                <label>
                    Stock quantity:
                    <input name="quantity" type="number" value={this.state.quantity} onChange={this.handleInputChange} />
                </label>
                <label>
                    Stock purchase date:
                    <input name="purchasedate" type="text" value={this.state.purchasedate} onChange={this.handleInputChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
} */

const APItoken = "Tpk_bb33d8b9dfec4e11b6ec94cff09d5685";
ReactDOM.render(
    <App />,
    document.getElementById("root")
);