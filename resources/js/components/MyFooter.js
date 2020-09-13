import React, { Component } from "react";
import logo from "./logo.svg";

class MyFooter extends Component {
    render() {
        return (
            <section>
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center py-5">
                        <div className="d-flex align-items-center">
                            <img className="mylogo" src={logo} />
                            <small className="text-muted mx-3 mt-2">Droits d'auteur © 2020 Udemy, Inc.</small>
                        </div>

                        <div className="d-flex align-items-center">
                            
                            <small className="text-muted mx-3">Conditions</small>
                            <small className="text-muted mx-3">Politique de confidentialité et politique en matière de cookies</small>
                        </div>
                       
                    </div>
                </div>
            </section>
        );
    }
}

export default MyFooter;
