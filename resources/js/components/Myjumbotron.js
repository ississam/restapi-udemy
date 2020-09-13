import React, { Component } from "react";

class Myjumbotron extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: []
    }

  };

  componentDidMount() {
    let token="";  
    if(localStorage.getItem("token")){
      token= localStorage.getItem("token");
      console.log(token);
    }
    else if(sessionStorage.getItem("token")){
      token= sessionStorage.getItem("token");
    }
    axios.get('api/user/info', { headers: { "Authorization": `Bearer ${token}` } }).then(response => {
      this.setState({
        user: response.data
      });
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <section>
        <div className="p-5 bg1">
          <div className="container">
            <h3 className="text-secondary"><i className="fa fa-user-circle-o fa-1x mr-1" aria-hidden="true"></i>{this.state.user.name}</h3>
          </div>
        </div>
      </section>
    );
  }
}

export default Myjumbotron;
