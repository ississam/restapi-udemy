import React,{Fragment,useState,useEffect} from 'react';

import Home from './components/Home';
import Courses from './components/Courses';
import EditProfile from './components/EditProfile';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import ForgotPass from './components/ForgotPass';
import ResetPass from './components/ResetPass';
import MyFooter from './components/MyFooter';
import RouteAuth from "./components/routes/RouteAuth";
import RouteNotAuth from "./components/routes/RouteNotAuth";
import Detail from "./components/detail/Detail"

import {BrowserRouter,Route,Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';


function Application(props){
    
    const [courses,setCourses]=useState([]);
    const [data,setData]=useState({});
    const [item,setItem]=useState("");
    const [ignore,forceUpdate]=useState(["init"]);

    useEffect(()=>{
        console.log("mount")
        console.log("prev",courses)
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
            let course=[];
            res.data.forEach(element => {
                axios.get('https://cors-anywhere.herokuapp.com/https://www.udemy.com/api-2.0/courses/'+element.courses_id+'/?fields[course]=@all', { headers: { Authorization: 'Basic ZDRUUnpnS0pmTEtnTW16SFdMTXM5dmlFYTY0QWcySnNNOGEzOFpFbzo2UEppUUlENGdwcnJKNFZBZDRwVjV3RTVLb3Nac0NuYmQ4aGRhalFNdXRGd0xzRXh1MFlPSHk1ZzlJTDJhTkpKUHlKSEVFQjFsUU5mUFo0Z09YaFUxdEd1V1ZyOTF3eHdXYnJMVml3Q3FEVnRmWVRERDNSY0MyREpVNGpmazYzcQ==' } })
                .then(res2 => {
                    //console.log(res2.data);                    
                    course.push({ id: res2.data.id, title: res2.data.title, image: res2.data.image_240x135, price: res2.data.price, name: res2.data.visible_instructors[0].name, url: res2.data.url,rating:res2.data.rating.toFixed(2),num_reviews:res2.data.num_reviews });//recuperer les données voulus dans l'objet
                    if(course.length===res.data.length){
                        setCourses(course);
                    }          
                })          
            });
            }).catch(errors => {
            console.log(errors);
            })
        }  
    },[ignore]);

    function updateHandler(props){
        console.log("forceUpdate")
        setCourses([])
        props.history.push("/profile")
        forceUpdate([""])
    }  

  //  *** Delete Courses  ******
  function deleteCourses(id) {
    let token="";  
    if(localStorage.getItem("token")){
      token= localStorage.getItem("token");
      console.log(token);
    }
    else if(sessionStorage.getItem("token")){
      token= sessionStorage.getItem("token");
    }
    const coursesUpdate = courses.filter(course => {
      return course.id !== id
    });

    setCourses(coursesUpdate);

    axios.delete(`/api/courses/${id}/delete`, { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {
        console.log(res);
      });
  }
    function getData(data,props,item){
        props.history.push("/");
        setData(data);
        setItem(item);
    }
    setTimeout(function () { sessionStorage.removeItem("error");sessionStorage.removeItem("success"); }, 1000);
   
    return(
        <Fragment>
            <BrowserRouter>
                <Navbar courses={courses} getData={getData}/>
                <Switch>   
                    <RouteAuth exact path="/profile" component={()=><Courses courses={courses} deleteCourses={deleteCourses}/>}/>
                    <Route exact path="/" component={()=><Home data={data} item={item}/>}/>
                    <RouteAuth exact path="/edit-profile" component={EditProfile}/>                        
                    <RouteNotAuth path="/courses/register" component={Register}/>
                    <RouteNotAuth path="/courses/login" component={()=><Login updateHandler={updateHandler}/>}/>
                    <RouteNotAuth path="/courses/password" component={ForgotPass}/>
                    <RouteNotAuth path="/courses/resetpass/:token" component={ResetPass}/>
                    <Route path="/detail/:id" component={Detail}/>
                </Switch>
                <MyFooter/>
            </BrowserRouter>
        </Fragment>
    )
}

export default Application;