import React,{Component,Fragment} from "react";
import axios from 'axios';


class ForgotPass extends Component{
    constructor(props){
        super(props);  
        this.sendEmail=this. sendEmail.bind(this);
        this.changeEmail=this.changeEmail.bind(this);
        this.state={
            email:"",
            error:""
        }
    };
    changeEmail(e){
        e.preventDefault();
        this.setState({
            email:e.target.value
        })     
    }

    sendEmail(e){
        e.preventDefault();
        axios.post("/api/password/email",{
            email:this.state.email,
        }).then(res=>{
            this.setState({
                email:"",
            });
            sessionStorage.setItem('success',"Un message vous a été envoyé pour changer votre mot de passe");
            this.props.history.push("/courses/login");
        }).catch(error=>{
            if (error.response){
                console.log(error.response)
                this.setState({
                    error:error.response.data.error
                })
            }
        }) 
    }
    
    render(){
        setTimeout(function () { sessionStorage.removeItem("error");sessionStorage.removeItem("success"); }, 1000);
        let error=this.state.error;
        return(
            <Fragment>
                <div style={{width:"40%",margin:"10% auto"}}>
                    <div className="container">
                        <h2 className="mb-5 text-center">Mot de passe oublié </h2>
                        <form className="form-signin" onSubmit={this.sendEmail}>
                            <div className="form-group">
                                <input type="email" id="inputEmail" className="form-control" placeholder="Addresse email " name="email" required onChange={this.changeEmail}/>
                                {
                                    error && <li className="text-danger">{error}</li>
                                }
                            </div>
                            <button className="btn btn-lg btn-danger btn-block" type="submit">Valider</button>
                        </form>
                    </div>
                </div>
        </Fragment>
        )
    }
}

export default ForgotPass;