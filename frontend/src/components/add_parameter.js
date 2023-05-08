import React, { Component} from "react";

export default class BankName extends Component {
    constructor(props){
        super(props);
        this.state={
            bank:"",
        };
    }    
    componentDidMount(){
    fetch("http://localhost:5000/bank", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "bank");
        this.setState({bank: data.data});
      });
  }

  render(){
    return (
        <div>
            <h3><h2>Hello <b>{this.state.userData.bank}</b> Bank</h2></h3>
        </div>
    );
  }
}