import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import StockTables from "./components/Table.js";
import Form from "./components/Form.js";
import CreatePortfolio from "./components/Portfolio.js"

/* TODO:
When submitting Form add new row to Table ✔
Add table to a portfolio
Remove row from Table
Make portfolios addable and removable
Make Graph show
 */
/* 
https://sandbox.iexapis.com/beta/stock/AAPL/quote/?token=Tpk_bb33d8b9dfec4e11b6ec94cff09d5685&period=annual */

class App extends React.Component {
    
    render(){
        return(
            <div className="App">                 
                <CreatePortfolio />
            </div>
           
        )
    }
}
export default App;

const APItoken = "Tpk_bb33d8b9dfec4e11b6ec94cff09d5685";

ReactDOM.render(
    <App />,
    document.getElementById("root")
);