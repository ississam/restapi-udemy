import React, { Component, Fragment } from "react";
import axios from 'axios';
import { NavLink,withRouter} from 'react-router-dom';


class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePass = this.changePass.bind(this);
        this.state = {
            email: "",
            password: ""
        }
    };

    changeEmail(e) {
        e.preventDefault();
        this.setState({
            email: e.target.value
        })
    }
    changePass(e) {
        e.preventDefault();
        this.setState({
            password: e.target.value
        })
    }

    login(e) {
        e.preventDefault();
        console.log("email", this.state.email);
        console.log("password", this.state.password);
        localStorage.setItem("mail", this.state.email);
        axios.post("/api/login", {
            email: this.state.email,
            password: this.state.password
        }).then(res => {
            console.log(res);
            if(document.getElementById("remember").checked){
                localStorage.setItem("token", res.data.success.token);
            }
            else if(document.getElementById("remember").checked==false){
                sessionStorage.setItem("token", res.data.success.token);
            }        
            this.setState({
                email: "",
                password: ""
            })
            console.log("Login")
            this.props.updateHandler(this.props);
        }).catch(error => {
            if (error.response) {
                if (error.response.status == 401) {
                    console.log("not valide");
                    sessionStorage.setItem('error', "Email ou password non valide");
                    this.props.history.push("/courses/login");
                };
            }
        })
    }

    render() {
        setTimeout(function () { sessionStorage.removeItem("error");sessionStorage.removeItem("success"); }, 1000);
        return (
            <Fragment>
                <div className="d-flex justify-content-center" style={{ margin: "5% auto" }}>
                    <div className="col-md-4">
                        <div className="container">
                            <h2 className="mb-5 text-center">Connectez-vous à votre compte Udemy !</h2>
                            <form className="form-signin" onSubmit={this.login}>
                                <div className="form-group">
                                    <input type="email" id="inputEmail" className="form-control" placeholder="Email" name="email" required onChange={this.changeEmail} />
                                </div>
                                <div className="form-group">
                                    <input type="password" id="inputPassword" className="form-control" placeholder="Mot de passe" name="password" required onChange={this.changePass} />
                                </div>

                                <div className="checkbox mb-3">
                                    <label>
                                        <input type="checkbox" value="remember-me"  id="remember"/> Remember me
                                </label>
                                </div>
                                <p className="text-center"><NavLink to="/courses/password">Vous avez oublié votre mot de passe.</NavLink></p>
                                <button className="btn btn-lg btn-danger btn-block" type="submit">Se connecter</button>


                                <div className="my-3 text-center">
                                Vous n'avez pas de compte ? <NavLink to="/courses/register">S’inscrire</NavLink>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default withRouter(Login);