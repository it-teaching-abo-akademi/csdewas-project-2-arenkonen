import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import CreatePortfolio from "./components/Portfolio.js"

/* TODO:
When submitting Form add new row to Table ✔
Add table to a portfolio
Remove row from Table
Make portfolios addable and removable
Make Graph show
 */


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
ReactDOM.render(
    <App />,
    document.getElementById("root")
);