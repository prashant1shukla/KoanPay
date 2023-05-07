import React, { Component} from "react";

export default class UserDetails extends Component {
    constructor(props){
        super(props);
        this.state={
            userData:"",
        };
    }    
    componentDidMount(){
    fetch("http://localhost:5000/userData", {
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
        console.log(data, "userData");
        this.setState({userData: data.data});
      });
  }
  render(){
    return (
        <div>
            <form onSubmit={this.handleSubmit}> 
              <h3><h2>Hello <b>{this.state.userData.fname}</b>, Admin</h2></h3>
              <div className="mb-3">
                <label>Type the name of the bank:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Bank Name"
                  onChange={e=>this.setState({fname:e.target.value})}
                />
              </div>
          </form>
        </div>
    );
  }
}