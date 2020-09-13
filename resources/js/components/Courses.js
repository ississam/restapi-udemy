import React, { Component } from 'react';
import axios from "axios";
import {withRouter} from 'react-router-dom';
import "./MyStyle.css";
import Myjumbotron from "./Myjumbotron";

class Courses extends Component {

  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      coursereviews: []
    }
  };
 
  componentDidMount() {
    this.setState({
      courses:this.props.courses
    })
    let token="";  
    if(localStorage.getItem("token")){
      token= localStorage.getItem("token");
    }
    else if(sessionStorage.getItem("token")){
      token= sessionStorage.getItem("token");
    }
    if(token){
      axios.get("/api/courses", { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {
        res.data.forEach(element => {
            axios.get('https://cors-anywhere.herokuapp.com/https://www.udemy.com/api-2.0/courses/' + element.courses_id + '/reviews/', { headers: { Authorization: 'Basic ZDRUUnpnS0pmTEtnTW16SFdMTXM5dmlFYTY0QWcySnNNOGEzOFpFbzo2UEppUUlENGdwcnJKNFZBZDRwVjV3RTVLb3Nac0NuYmQ4aGRhalFNdXRGd0xzRXh1MFlPSHk1ZzlJTDJhTkpKUHlKSEVFQjFsUU5mUFo0Z09YaFUxdEd1V1ZyOTF3eHdXYnJMVml3Q3FEVnRmWVRERDNSY0MyREpVNGpmazYzcQ==' } })
              .then(reviews => {
                this.setState({
                  coursereviews : reviews.data.results
                })         
              })              
        });
      }).catch(errors => {
        console.log(errors);
      })

    //  **** User info  ******
  axios.get('api/user/info', { headers: { "Authorization": `Bearer ${token}` } }).then(response => {
      this.setState({
        user: response.data
      });
    }).catch(err => {
      console.log(err);
    })
    }
  }


  render() {
    setTimeout(function () { sessionStorage.removeItem("error");sessionStorage.removeItem("success"); }, 1000);
    let courses = this.state.courses;
    let coursesArray = (courses.length) ? (courses.map(item => {
      return (
        
        <div className="col-md-3" key={item.id}>
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front shadow my-box-shadow">
                <img className="card-img-top" src={item.image} />
                <div className="card-body bg-white">
                  <h6 className="card-title">
                    {item.title}
                  </h6>
                  <p className="text-muted">par <strong>{item.name}</strong></p>
                  <div className="d-flex mb-2">
                    <div>
                      { 
                          [...Array(parseInt(item.rating.toString()))].map((x, i) =>
                            <i className="fa fa-star color-start" aria-hidden="true" key={i}></i>
                          )
                      }
                    </div>
                    <span className="mx-2 text-secondary"><strong>{item.rating}</strong> ({item.num_reviews})</span>
                  </div>
                  <div className="pb-4">
                    <h5 className="float-right mb-3">{item.price}</h5>
                  </div>

                </div>
              </div>

              <div className="flip-card-back bg-white p-2 shadow my-box-shadow">
                <div className="btn-group d-flex justify-content-center">
                  <button type="button" className="btn btn-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fa fa-ellipsis-h fa-2x" aria-hidden="true"></i>

                  </button>
                  <div className="dropdown-menu dropdown-menu-right">
                    <button className="dropdown-item text-danger" type="button"><i className="fa fa-trash-o" aria-hidden="true"></i> Supprimer</button>
                  </div>
                </div>
                <h6 className="text-secondary text-center">{item.title}</h6>
                <a className="btn btn-outline-info btn-block my-3" href={"/detail/"+item.id}>Accéder au cours</a>
                <button className="btn btn-outline-danger btn-block my-3" type="button" onClick={() => this.props.deleteCourses(item.id)}><i className="fa fa-trash-o" aria-hidden="true"></i> Supprimer</button>
              </div>
            </div>
          </div>
        </div>
      )
    })) : ("");

    return (
      <div>
        <Myjumbotron />
        <section className="bg2 pt-3 pb-5 mb-5 my-h-75">
          <div className="container">
            <h6 className="text-center color1 my-3">
              Cours auxquels vous êtes inscrit
            </h6>
            <div className="row px-3 mx-3">
              {coursesArray}
            </div>
          </div>
        </section>
      </div>

    )
  }
}
export default withRouter(Courses);