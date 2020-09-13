import React,{Fragment,useState,useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import $ from 'jquery';


function Home(props){
    const [courses,setCourses]=useState([]);
    const [category,setCategory]=useState("");
    const [title,setTitle]=useState("Touts les cours");
    const [page,setPage]=useState("");

    function categorySelected(item){
        // e.preventDefault();
         let category=item;
         console.log("cat",category);  
         setCategory(item);
     }

    useEffect(()=>{
        if(props.data.results){
            console.log("props",props.data);
            setCourses(props.data.results);
            setTitle(`resultat du recherche (${props.item})`);
        }
        else{
            axios.get('https://cors-anywhere.herokuapp.com/https://www.udemy.com/api-2.0/courses/?fields[course]=@all&page_size=28', {
            headers: {
                Authorization: 'Basic ZDRUUnpnS0pmTEtnTW16SFdMTXM5dmlFYTY0QWcySnNNOGEzOFpFbzo2UEppUUlENGdwcnJKNFZBZDRwVjV3RTVLb3Nac0NuYmQ4aGRhalFNdXRGd0xzRXh1MFlPSHk1ZzlJTDJhTkpKUHlKSEVFQjFsUU5mUFo0Z09YaFUxdEd1V1ZyOTF3eHdXYnJMVml3Q3FEVnRmWVRERDNSY0MyREpVNGpmazYzcQ=='
            }
            }).then(res=>{
                console.log("response",res);
                console.log("props",props.data);
                setCourses(res.data.results);           
              })
        }
        
    },[]);
    useEffect(()=>{
        if(category || page){
            axios.get('https://cors-anywhere.herokuapp.com/https://www.udemy.com/api-2.0/courses/?fields[course]=@all&page_size=28&page='+(page?page:1)+'&category='+category, {
                headers: {
                    Authorization: 'Basic ZDRUUnpnS0pmTEtnTW16SFdMTXM5dmlFYTY0QWcySnNNOGEzOFpFbzo2UEppUUlENGdwcnJKNFZBZDRwVjV3RTVLb3Nac0NuYmQ4aGRhalFNdXRGd0xzRXh1MFlPSHk1ZzlJTDJhTkpKUHlKSEVFQjFsUU5mUFo0Z09YaFUxdEd1V1ZyOTF3eHdXYnJMVml3Q3FEVnRmWVRERDNSY0MyREpVNGpmazYzcQ=='
                }
            }).then(res=>{
                console.log("response2",res);
                console.log("props",props.data);
                setCourses(res.data.results);
                if(category){
                    setTitle(category);
                    setCategory("");
                    setPage("");
                } 
                $("html, body").animate({ scrollTop: 0 },200);    
            })  
        }         
    },[page,category])

    let categories=["Business","Design","Development","Lifestyle","Marketing","Udemy Free Resource Center","Personal Development","Photography","Teaching & Academics"];
    let categoriesList=categories.map(item=>{
        return(
            <li className="nav-item">
                <a className="nav-link" href="#" onClick={e=> { e.preventDefault(); categorySelected(item)} }>{item}</a>
            </li> 
        )
    })
    let coursesArray = (courses.length) ? (courses.map(item => {
        return (
            <Fragment>
             <div className="col-md-3" key={item.id}>
                  <Link to={"/detail/"+item.id}>
                      <img className="card-img-top" src={item.image_750x422} />
                   </Link>
                  <div className="card-body bg-white">
                    <Link to={"/detail/"+item.id}>
                        <h6 className="card-title">{item.title}</h6>
                    </Link>
                    <p className="text-muted">par <strong>{item.visible_instructors[0].display_name}</strong></p>
                    <div className="d-flex mb-2">
                      <div>
                          {
                              [...Array(parseInt(item.rating.toString()))].map((x, i) =>
                                 <i className="fa fa-star color-start" aria-hidden="true" key={i}></i>
                              )
                          }
                      </div>
                      <span className="mx-2 text-secondary"><strong>{item.rating.toFixed(2)}</strong> ({item.num_reviews})</span>
                    </div>
                    <div className="pb-4">
                      <h5 className="float-right mb-3">{(item.price)?item.price:""}</h5>
                    </div>
                  </div>
              </div>
            </Fragment>
        )
      })) : (<div className="alert alert-warning text-center col-12">Auncun cours trouvé</div>);
    return(
        <Fragment>
            <ul className="nav nav-tabs mb-5 justify-content-center">
                {categoriesList}
            </ul>
            <div className="container mt-5">
                <h4 className="text-center mt-4 mb-4">{title}</h4>
                <div className="row">
                    {coursesArray}
                    <nav aria-label="Page navigation example mt-5">
                        <ul class="pagination">
                            <li class="page-item">
                                <a class="page-link" href="#" aria-label="Previous" onClick={e=>{e.preventDefault();if(page>1){setPage(page-1)}}}>
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <li class="page-item"><a class="page-link" href="#" onClick={(e)=>{e.preventDefault();setPage(1);console.log(page)}}>1</a></li>
                            <li class="page-item"><a class="page-link" href="#" onClick={(e)=>{e.preventDefault();setPage(2);console.log(page)}}>2</a></li>
                            <li class="page-item"><a class="page-link" href="#" onClick={(e)=>{e.preventDefault();setPage(3);console.log(page)}}>3</a></li>
                            <li class="page-item">
                                <a class="page-link" href="#" aria-label="Next" onClick={(e)=>{e.preventDefault();setPage(page+1)}}>
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                            <li className="page-item">
                            <a class="page-link" href="" onClick={e=>e.preventDefault()}>page {page}</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>          
        </Fragment>   
    )
}

export default Home;