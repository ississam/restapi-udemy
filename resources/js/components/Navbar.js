import React, { Component, Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import logo from "./logo.svg";
import $ from 'jquery';


class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state={
            data:{},
            item:""
        }
        this.logOut = this.logOut.bind(this);
        this.handelSubmit=this.handelSubmit.bind(this);
        this.handelChange=this.handelChange.bind(this);
    }

    logOut(e) {
        e.preventDefault();
       /* axios.delete("api/courses/removeToken").then(res => {
            localStorage.removeItem("token");
            localStorage.removeItem("mail");
            this.props.history.push("/");
        })*/
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        localStorage.removeItem("mail");
        this.props.history.push("/");
       
    }
    userLogin() {
        return (
            <Fragment>
                <div className="d-flex">
                    <NavLink className="btn btn-outline-dark mx-1" to="/courses/login">Se connecter</NavLink>
                    <NavLink className="btn btn-danger mx-1" to="/courses/register">S'inscrire</NavLink>
                </div>
            </Fragment>
        )
    }

    user() {
        return (
            <Fragment>
                <li className="nav-item dropdown">
                    <span className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {localStorage.getItem("mail")}
                    </span>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" onClick={this.logOut}>logOut</a>
                    </div>
                </li>
            </Fragment>
        )
    }
     handelChange(e){
      e.preventDefault();
      this.setState({
          item:e.target.value
      })  
     }
     handelSubmit(e){
        e.preventDefault();
        //let item=$("#search").val();
        let item=this.state.item;
        if(item){
            axios.get('https://cors-anywhere.herokuapp.com/https://www.udemy.com/api-2.0/courses/?fields[course]=@all&page_size=28&search='+item, {
            headers: {
                Authorization: 'Basic ZDRUUnpnS0pmTEtnTW16SFdMTXM5dmlFYTY0QWcySnNNOGEzOFpFbzo2UEppUUlENGdwcnJKNFZBZDRwVjV3RTVLb3Nac0NuYmQ4aGRhalFNdXRGd0xzRXh1MFlPSHk1ZzlJTDJhTkpKUHlKSEVFQjFsUU5mUFo0Z09YaFUxdEd1V1ZyOTF3eHdXYnJMVml3Q3FEVnRmWVRERDNSY0MyREpVNGpmazYzcQ=='
            }
        }).then(res=>{
            console.log("datanav",res.data);
            this.props.getData(res.data,this.props,item);
        })
        }
        
        // console.log(response.data.results,response.data.results[3].title, response.data.image_480x270);     
    }
    render() {
        setTimeout(function () { sessionStorage.removeItem("error");sessionStorage.removeItem("success"); }, 1000);
        let courses=this.props.courses;
        console.log("nv",courses);
        let coursesArray = (courses.length) ? (courses.map(item => {
            return (
                <a className="dropdown-item" href={"/detail/"+item.id}>
                    <div className="d-flex mb-3">
                        <img className="nav-menu-img" src={item.image} />
                        <div>
                            <h6 className="p-0 m-0">{item.title}</h6>
                            <small className="p-0 m-0 text-muted">par <strong>{item.name}</strong></small>
                        </div>
                    </div>
                </a>
            )
        })) : ("");

        return (
            <section>
                <div className="container">
                    <nav className="d-flex justify-content-between align-items-center py-3">
                        <NavLink to="/">
                            <img className="mylogo" src={logo} />
                        </NavLink>
                        <div className="col-auto">
                            <label className="sr-only" htmlFor="inlineFormInputGroup">
                            </label>  
                            <form className="form-inline mt-2 mt-md-0" onSubmit={this.handelSubmit}>
                                <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" onChange={this.handelChange}/>
                                <input value="submit" type="submit" hidden/>
                            </form>                                                   
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="dropdown show">
                                {(sessionStorage.token || localStorage.token ) ?
                                    <span className="btn btn-link dropdown-toggle text-muted m-0" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Mes cours</span>
                                    : ""}

                                <div className="dropdown-menu pb-0" aria-labelledby="dropdownMenuLink">

                                {coursesArray}
                                    <NavLink className="dropdown-item bg-light text-right text-info py-3" to="/profile">Afficher tout</NavLink>
                                </div>
                            </div>
                            <i className="fa fa-heart-o text-danger mx-3 py-2 fa-2x" aria-hidden="true"></i>
                            <i className="fa fa-shopping-cart text-muted mx-3 py-2 fa-2x" aria-hidden="true"></i>


                            {(sessionStorage.token || localStorage.token)?
                                <div className="dropdown show">
                                    <span className="btn btn-link text-muted" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fa fa-user-circle-o text-muted mx-3 fa-2x" aria-hidden="true"></i>
                                    </span>

                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <span className="dropdown-item" href="#">
                                            <div className="d-flex mb-3">
                                                <i className="fa fa-user-circle-o text-muted fa-3x mr-2" aria-hidden="true"></i>
                                                <div>
                                                    <span className="p-0 m-0">{this.user()}</span>
                                                </div>

                                            </div>
                                        </span>
                                        <a className="dropdown-item" href="/profile">
                                            Mes cours
                                        </a>
                                        <a className="dropdown-item" href="/edit-profile">
                                            Compte
                                        </a>
                                        <hr />

                                        <a className="dropdown-item" href="#" onClick={this.logOut}>
                                            Se déconnecter
                                    </a>
                                    </div>
                                </div>
                                : this.userLogin()}
                        </div>
                    </nav>
                </div>
                {
                    sessionStorage.getItem("success") && <div className="alert alert-success text-black text-center">{sessionStorage.getItem("success")}
                    </div>
                }
                {
                    sessionStorage.getItem("error") && <div className="alert alert-danger text-black text-center">{sessionStorage.getItem("error")}
                    </div>
                }
            </section>
        )
    }
}

export default withRouter(Navbar);