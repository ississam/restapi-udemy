import React from 'react';
import {Route,Redirect} from 'react-router-dom';

export default function RouteNotAuth({component:Component,...rest}){
    return(sessionStorage.token || localStorage.token)?(
        <Redirect to="/profile"/>
    ):(
        <Route {...rest} component={Component}/>
    )
}