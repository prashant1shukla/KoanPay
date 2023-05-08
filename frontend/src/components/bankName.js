import React, { Component} from "react";

export default class UserDetails extends Component {
    constructor(props){
        super(props);
        this.state={
            userData:"",
            bank:"",
            
        };
        this.handleSubmit=this.handleSubmit.bind(this);
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
  
  handleSubmit(e){
    e.preventDefault();
    const{bank}=this.state;
    console.log(bank);
    fetch("http://localhost:5000/bank-name",{
        method: "POST",
        crossDomain: true,
        headers:{
            "Content-Type":"application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            bank,
        }),
    })
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data, "bank created");
        if (data.status == "ok") {
          alert("bank done");
          // window.localStorage.setItem("token", data.data);
          // window.localStorage.setItem("loggedIn", true);

          window.location.href = "./add_parameter";
        }
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
                  onChange={e=>this.setState({bank:e.target.value})}
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Create Bank
                </button>
              </div>
          </form>
        
        </div>
    );
  }
}