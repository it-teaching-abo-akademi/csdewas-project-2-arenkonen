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
                quantity: 0,
                purchasedate: ""
            },
            datum: []
        }
        this.handleInputChange =this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /* componentDidMount() {
        fetch("https://sandbox.iexapis.com/beta/stock/"+ this.state.name +"/quote/?token="+ APItoken +"&period=annual")
        .then(res => res.json())
        .then((data) => {
          this.setState({ stocks: data })
        })
        .catch(console.log)

        fetch("/api/form-submit-url").then((data) => {
            this.setState({formdata : data})
        }).catch(console.log)
    } */

    handleChange = e => {
        const { name, value } = e.target;
    
        this.setState(prevState => ({
          post: { ...prevState.post, [name]: value }
        }));
      };
 
    
    handleSubmit(event){
        event.preventDefault();
        /* this.setState(prevState => ({
            datum: [...prevState.datum, prevState.post],
            post: { name: "", quantity: 0, purchasedate: "" } 
          }));
          */

        fetch("https://sandbox.iexapis.com/beta/stock/"+ this.state.post.name +"/quote/?token="+ APItoken +"&period=annual")
        .then(res => res.json())
        .then((data) => {
          this.setState({ stocks: data })
        })
        .catch(console.log)

        ReactDOM.render(
            <App />,
            document.getElementById("root")
        );
    }
    
    render() {
        console.log( this.state.datum.name)
        return (
            <div className="App">
                <Form 
                    handleChange = {this.handleChange}
                    post={this.state.post}
                    handleSubmit={this.handleSubmit}
                />
                <Table stocks = { this.state.stocks } quantity = {this.state.post.quantity} purchasedate = {this.state.post.purchasedate}/>
            </div>
            
        );
    }
}
export default App;

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