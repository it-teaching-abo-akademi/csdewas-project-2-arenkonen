import React from "react";
import StockTables from "./Table.js";

//Handles a portfolio and its removal
class Portfolio extends React.Component{
   constructor(props){
        super(props);
        this.state={
            portfolioName:this.props.portfolioName,
            deleted:false
        }

        this.RemovePortfolio = this.RemovePortfolio.bind(this);
    }
    RemovePortfolio(){
        this.setState({deleted:true});
    }

    render(){
        //Checks if the remove portfolio button has been pressed and returns null if it has removing the portfolio
        if(!this.state.deleted){
            return (
                <div className="portfolio col-5 col-s-12">
                    <h1>{this.state.portfolioName}</h1>
                    <StockTables />
                    <button onClick={this.RemovePortfolio}>Remove!</button>       
                </div>
            );   
        }
        else return null;
        
        
    }
}
//Handles the input of portfolio name
class CreatePortfolio extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value: "",
            portfolios: [],
            showComponent: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        this.setState({value: event.target.value});
    }
    handleSubmit(event){
        
        event.preventDefault();
        this.setState({
            portfolios:this.state.portfolios.concat(<Portfolio portfolioName={this.state.value}/>)});
    }

    render(){
        return(
        <div>
                <form onSubmit={this.handleSubmit} >    
                    <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Enter portfolio title" />
                    <input type="submit" value="Add New Portfolio" />
                </form>      
               
               {this.state.portfolios.map((portfolio, index) => <Portfolio key={index} portfolioName={this.state.value}/>)}   
               </div>
        )   
    }
}
export default CreatePortfolio