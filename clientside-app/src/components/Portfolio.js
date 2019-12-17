import React from "react";
import StockTables from "./Table.js";

class Portfolio extends React.Component{
    constructor(props){
        super(props);
        this.state={
            portfolios: 0
        }
    }

    render(){
        console.log(this.props.portfolioName)
        if(this.props.portfolios>=5){
            return(
                <div>
                <h1>{this.props.portfolioName}</h1>
                <StockTables />
                <h1>{this.props.portfolioName}</h1>
                <StockTables />
                <h1>{this.props.portfolioName}</h1>
                <StockTables />
                <h1>{this.props.portfolioName}</h1>
                <StockTables />
                <h1>{this.props.portfolioName}</h1>
                <StockTables />
                </div>
            )
        }
        if(this.props.portfolios===4){
            return(
                <div>
                <h1>{this.props.portfolioName}</h1>
                <StockTables />
                <h1>{this.props.portfolioName}</h1>
                <StockTables />
                <h1>{this.props.portfolioName}</h1>
                <StockTables />
                <h1>{this.props.portfolioName}</h1>
                <StockTables />
                </div>
            )
        }
        if(this.props.portfolios===3){
            return(
                <div>
                <h1>{this.props.portfolioName}</h1>
                <StockTables />
                <h1>{this.props.portfolioName}</h1>
                <StockTables />
                <h1>{this.props.portfolioName}</h1>
                <StockTables />

                </div>
            )
        }
        if(this.props.portfolios===2){
            return(
                <div>
                <h1>{this.props.portfolioName}</h1>
                <StockTables />
                <h1>{this.props.portfolioName}</h1>
                <StockTables />
                </div>
            )
        }
        if(this.props.portfolios===1){
            return(
                <div>
                <h1>{this.props.portfolioName}</h1>
                <StockTables />
                </div>
            )
        }
        if(this.props.portfolios===0){
            return(
                <div>
                null
                </div>
            )
        }
        else return null
        
    }
}


class CreatePortfolio extends React.Component{
    constructor(props){
        super(props);
        this.state={
            portfolioName: "",
            portfolios: 0,
            showComponent: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        this.setState({portfolioName: event.target.portfolioName});
    }
    handleSubmit(event){
        console.log("yeer")
        event.preventDefault();
        this.state.portfolios++;
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit} >           
                    <input name="name" type="text" value={this.state.portfolioName} onChange={this.handleChange} placeholder="Enter portfolio title" />
                    <input type="submit" value="Add New Portfolio" />
                </form>
                <form onSubmit={this.handleSubmit} >           
                    <input name="name" type="text" value={this.state.portfolioName} onChange={this.handleChange} placeholder="Enter portfolio title" />
                    <input type="submit" value="Add New Portfolio" />
                </form>

                <Portfolio portfolios={this.state.portfolios} />
               
            </div>
        )   
    }
}
export default CreatePortfolio