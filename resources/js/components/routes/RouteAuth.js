import React from 'react';
import {Route,Redirect} from 'react-router-dom';


function RouteAuth({component:Component,...rest}){
    return (localStorage.token || sessionStorage.token)?(
        <Route {...rest} component={Component}/>
    ):(
        <Redirect to="/courses/login"/>
    )
}

export default RouteAuth;