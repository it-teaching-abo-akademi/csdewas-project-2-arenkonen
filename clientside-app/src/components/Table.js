import React from "react";
import Form from "./Form.js"
const APItoken = "Tpk_bb33d8b9dfec4e11b6ec94cff09d5685";
class Table extends React.Component {
    constructor(props){
        super(props);
        this.state={
            rows:this.props.rows,
            stocks: [],
            oldStocks: [],
            apifetched1: false,
            apifetched2: false,

        }
        this.apiFetch = this.apiFetch.bind(this);
    }
    
    addRows(){
        if(this.state.apifetched1 && this.state.apifetched1){

            var totalValue = this.props.post.quantity * this.state.stocks.latestPrice

            if(typeof this.state.oldStocks !== "undefined"){
                var newdata = {
                    name:this.state.stocks.symbol, 
                    value:this.state.stocks.latestPrice, 
                    quantity:this.props.post.quantity, 
                    totalValue:totalValue,
                    purchaseValue:this.state.oldStocks.close,
                    select:this.state.stocks.lastTradeTime};
            }
            else {
                newdata = {
                    name:this.state.stocks.symbol, 
                    value:this.state.stocks.latestPrice, 
                    quantity:this.props.post.quantity, 
                    totalValue:totalValue,
                    purchaseValue:"0",
                    select:this.state.stocks.lastTradeTime};
            }
           
            console.log(newdata);
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
                <td>{index}</td>
            </tr>);
        });
    }
    
    apiFetch(){
        console.log(this.props.post.name)
        fetch("https://sandbox.iexapis.com/beta/stock/"+ this.props.post.name +"/quote/?token="+ APItoken +"&period=annual")
        .then(res => res.json())
        .then((data) => {
          this.setState({ stocks: data },() => {
            this.setState({apifetched1:true});
          })
        })
        .catch(console.log)

        fetch("https://sandbox.iexapis.com/stable/stock/"+ this.props.post.name +"/chart/date/"+ this.props.post.purchasedate +"?chartByDay=true&token="+ APItoken +"&period=annual")
        .then(res => res.json())
        .then((data) => {
          this.setState({ oldStocks: data[0] },() => {
            console.log("HER")
            console.log(this.props.buttonPressed)
            this.setState({apifetched2:true});
            this.addRows()
            
         })
        })
        .catch(console.log)
        console.log(this.props.post.name)
        console.log(this.state.stocks.symbol)
        console.log("https://sandbox.iexapis.com/stable/stock/"+ this.props.post.name +"/chart/date/"+ this.props.post.purchasedate +"?chartByDay=true&token="+ APItoken +"&period=annual");
        console.log("https://sandbox.iexapis.com/beta/stock/"+ this.props.post.name +"/quote/?token="+ APItoken +"&period=annual");
    }

    render(){
        if (this.props.buttonPressed){
        return(                  
            <div className="stock-table">
            {this.apiFetch()}
            {/* {this.addRows()} */}
            <table >
                <thead>
                    <tr>
                        <th>Name</th>
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
        else return (
            <div className="stock-table">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
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
            <button onClick={this.apiFetch}>Refresh</button>
            </div>
        )
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