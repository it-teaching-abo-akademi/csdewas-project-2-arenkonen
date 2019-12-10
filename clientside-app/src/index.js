import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

/* TODO:
When submitting Form add new row to Table
Add table to a portfolio
Remove row from Table
Make portfolios addable and removable
Make Graph show
 */
/* import Table from "./components/Table.js"; */
/* 
https://sandbox.iexapis.com/beta/stock/AAPL/quote/?token=Tpk_bb33d8b9dfec4e11b6ec94cff09d5685&period=annual */

/* class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: []
        }
    }
    componentDidMount() {
        fetch("https://sandbox.iexapis.com/beta/stock/AAPL/quote/?token=Tpk_bb33d8b9dfec4e11b6ec94cff09d5685&period=annual")
        .then(res => res.json())
        .then((data) => {
          this.setState({ stocks: data })
        })
        .catch(console.log)

    }
    render() {
        console.log(this.state.stocks)
        return (
            <div className="App">
                <Table stocks = { this.state.stocks } />
            </div>
        );
    }
}
export default App;
 */
class AddStock extends React.Component{
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

    handleSubmit(event){
        alert('The following details were entered: ' + this.state.name + ", " + this.state.quantity.toString() + ", " + this.state.purchasedate)
        event.preventDefault();
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
                    <input name="quantity" type="number" value={this.state.quanitity} onChange={this.handleInputChange} />
                </label>
                <label>
                    Stock purchase date:
                    <input name="purchasedate" type="text" value={this.state.purchasedate} onChange={this.handleInputChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

/* const APItoken = "Tpk_bb33d8b9dfec4e11b6ec94cff09d5685"; */
ReactDOM.render(
    <AddStock />,
    document.getElementById("root")
);