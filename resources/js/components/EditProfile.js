import React, { Component } from 'react';
import "./MyStyle.css";

class EditProfile extends Component {

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
        setTimeout(function () { sessionStorage.removeItem("error");sessionStorage.removeItem("success"); }, 1000);
        return (
            <section className="pt-3 pb-5 my-5">
                <div className="container">

                    <div className="row">
                        <div className="col-md-3">
                            <div className="card">
                                <div className="card-header text-center text-info">
                                    <i className="fa fa-user-circle-o fa-5x" aria-hidden="true"></i>
                                    <h4 className="my-3">{this.state.user.name}</h4>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item"><a href="/profile"> Mes cours</a></li>
                                    <li className="list-group-item"><a href="/edit-profile">Mon compte</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="card">
                                <div className="card-header text-center">
                                    <h5>Compte</h5>
                                    <p>Modifiez vos paramètres de compte et votre mot de passe.</p>
                                </div>
                                <div className="card-body">
                                    <h6 className="my-3 text-muted">Informations de base :</h6>
                                    <form>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text w-130" id="basic-addon1">Votre nom</span>
                                            </div>
                                            <input type="text" className="form-control" name="name" defaultValue={this.state.user.name || ''} aria-describedby="basic-addon1" />
                                        </div>

                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text w-130" id="basic-addon1">Votre prenom</span>
                                            </div>
                                            <input type="text" className="form-control" name="" aria-describedby="basic-addon1" />
                                        </div>


                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text w-130" id="basic-addon1">Votre E-mail</span>
                                            </div>
                                            <input type="text" className="form-control bg-light" defaultValue={this.state.user.email || ''} disabled="disabled" aria-describedby="basic-addon1" />
                                        </div>
                                        <div className="text-center">
                                            <button className="btn btn-danger">Modifier</button>
                                        </div>
                                    </form>

                                    <hr className='my-5' />

                                    <h6 className="my-3 text-muted"> Mot de passe :</h6>
                                    <form>
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" name="" placeholder="mot de passe" aria-describedby="basic-addon1" />
                                        </div>

                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" name="" placeholder="confirmation de mot de passe" aria-describedby="basic-addon1" />
                                        </div>
                                        <div className="text-center">
                                            <button className="btn btn-danger">Modifier le mot de passe</button>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default EditProfile;
