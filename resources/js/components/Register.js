import React,{Component,Fragment} from "react";
import axios from 'axios';
import { NavLink } from "react-router-dom";

class Register extends Component{
    constructor(props){
        super(props);  
        this.state={
            name:"",
            email:"",
            password:"",
            c_password:"",
            errors:""
        }
        this.changeEmail=this.changeEmail.bind(this);
        this.changePassword=this.changePassword.bind(this);
        this.changeName=this.changeName.bind(this);
        this.changeCPassword=this.changeCPassword.bind(this);
        this.register=this.register.bind(this);
    };
     
    changeName(e){
        e.preventDefault();
        console.log("name",e.target.value);
        this.setState({
            name:e.target.value,
        })
    }
    changeEmail(e){
        e.preventDefault();
        console.log("email",e.target.value);
        this.setState({
            email:e.target.value,
        })
    }
    changePassword(e){
        e.preventDefault();
        console.log("password",e.target.value);
        this.setState({
            password:e.target.value,
        })
    }
    changeCPassword(e){
        e.preventDefault();
        console.log("c_pass",e.target.value);
        this.setState({
            c_password:e.target.value,
        })
    }
    register(e){
        e.preventDefault(); 
        localStorage.setItem("mail",this.state.email);
        
        let newUser={
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            c_password:this.state.c_password
        }
        axios.post("/api/register",newUser).then(res=>{
            console.log(res);
            localStorage.setItem("token", res.data.success.token);  
            this.props.history.push("/profile");
        }).catch(error=>{
            if (error.response){
                console.log(error.response)
                this.setState({
                    errors:error.response.data.error
                })
            }
        })
    }
   
    render(){
        setTimeout(function () { sessionStorage.removeItem("error");sessionStorage.removeItem("success"); }, 1000);
        let {name:nameErr,email:emailErr,password:passwordErr,c_password:c_passwordErr}=this.state.errors;
        return(
            <Fragment>
                <div className="d-flex justify-content-center" style={{margin:"5% auto"}}>
                    <div className="col-md-4">
                        <div className="container">
                            <h2 className="mb-5 text-center">Inscrivez-vous et commencez à apprendre !</h2>
                            <form className="form-signin" onSubmit={this.register}>
                                <div className="form-group">
                                    <input type="text" id="inputName" className="form-control" placeholder="Prénom et Nom" name="name" required onChange={this.changeName} />
                                    {
                                    nameErr && <li className="text-danger">{nameErr}</li>
                                    }
                                </div>
                                <div className="form-group">
                                    <input type="email" id="inputEmail" className="form-control" placeholder="Email" name="email" required onChange={this.changeEmail} />
                                    {
                                    emailErr && <li className="text-danger">{emailErr}</li>
                                    }
                                </div>
                                <div className="form-group">
                                    <input type="password" id="inputPassword" className="form-control" placeholder="Mot de passe" name="password" required onChange={this.changePassword} />
                                    {
                                    passwordErr && <li className="text-danger">{passwordErr}</li>
                                    }
                                </div>
                                <div className="form-group">
                                    <input type="password" id="inputPassword" className="form-control" placeholder="Confirmation mot de passe" name="password" required onChange={this.changeCPassword} />
                                    {
                                    c_passwordErr && <li className="text-danger">{c_passwordErr}</li>
                                    }
                                </div>
                                <button className="btn btn-lg btn-danger btn-block" type="submit">Sign up</button>

                                <div className="my-3 text-center">
                                Vous avez déjà un compte ? <NavLink to="/courses/login">Se connecter</NavLink>
                                </div>                            
                            </form>
                        </div>
                     </div>
                </div>
            </Fragment>
        )
    }
}

export default Register;