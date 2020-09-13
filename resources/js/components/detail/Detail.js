import React, { Fragment } from "react";
import axios from "axios";
import "./Detail.css";
import $ from "jquery";
import Alert from "react-bootstrap/Alert";
import { Button, Modal } from "react-bootstrap";
import { Redirect } from "react-router-dom";

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.recommanderCours = this.recommanderCours.bind(this);
        this.addCours = this.addCours.bind(this);
        this.handelmodal = this.handelmodal.bind(this);
        this.handelclose = this.handelclose.bind(this);
        this.state = {
            usersList: [],
            courses: [],
            inst: [],
            details: [],
            description: "",
            update: false,
            show: false,
            idcours: 0,
            nomrecommander: ""
        };
    }

    componentDidMount() {
        const idu = this.props.match.params.id;
        this.setState({ idcours: idu });
        console.log("idu", idu);
        axios
            .get(
                "https://cors-anywhere.herokuapp.com/https://www.udemy.com/api-2.0/courses/" +
                    idu +
                    "/?fields[course]=@all",
                {
                    headers: {
                        Authorization:
                            "Basic ZDRUUnpnS0pmTEtnTW16SFdMTXM5dmlFYTY0QWcySnNNOGEzOFpFbzo2UEppUUlENGdwcnJKNFZBZDRwVjV3RTVLb3Nac0NuYmQ4aGRhalFNdXRGd0xzRXh1MFlPSHk1ZzlJTDJhTkpKUHlKSEVFQjFsUU5mUFo0Z09YaFUxdEd1V1ZyOTF3eHdXYnJMVml3Q3FEVnRmWVRERDNSY0MyREpVNGpmazYzcQ=="
                    }
                }
            )
            .then(res => {
                console.log("mon cours", res.data);
                this.setState({
                    courses: res.data
                });
                $("#mybody").html(res.data.description);
                this.setState({
                    inst: res.data.visible_instructors
                });
            });
        axios
            .get(
                "https://cors-anywhere.herokuapp.com/https://www.udemy.com/api-2.0/courses/" +
                    idu +
                    "/public-curriculum-items/",
                {
                    headers: {
                        Authorization:
                            "Basic ZDRUUnpnS0pmTEtnTW16SFdMTXM5dmlFYTY0QWcySnNNOGEzOFpFbzo2UEppUUlENGdwcnJKNFZBZDRwVjV3RTVLb3Nac0NuYmQ4aGRhalFNdXRGd0xzRXh1MFlPSHk1ZzlJTDJhTkpKUHlKSEVFQjFsUU5mUFo0Z09YaFUxdEd1V1ZyOTF3eHdXYnJMVml3Q3FEVnRmWVRERDNSY0MyREpVNGpmazYzcQ=="
                    }
                }
            )
            .then(res => {
                this.setState({
                    details: res.data.results
                });
            });

        axios.get(`/api/userslist`).then(res => {
            const listusersfiltred = res.data.filter(p => p.id !== 1);
            this.setState({
                usersList: listusersfiltred
            });
            console.log("liste users1", this.state.usersList);
        });
    }
    addCours() {
        let token = "";
        if (localStorage.getItem("token")) {
            token = localStorage.getItem("token");
            console.log("token", token);
        } else if (sessionStorage.getItem("token")) {
            token = sessionStorage.getItem("token");
        }

        axios
            .post(
                "/api/courses/ajouter",
                {
                    id: this.props.match.params.id
                },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then(res => {
                console.log(res);
                if (res.data.error) {
                    sessionStorage.setItem("error", res.data.message);
                    this.props.history.push(
                        "/detail/" + this.props.match.params.id
                    );
                    $("html, body").animate({ scrollTop: 0 }, 200);
                } else if (res.data.success) {
                    sessionStorage.setItem("success", res.data.message);
                    this.props.history.push(
                        "/detail/" + this.props.match.params.id
                    );
                    alert("Cours Ajouté avec succés");
                    $("html, body").animate({ scrollTop: 0 }, 200);
                }
            })
            .catch(err => {
                alert("Cours déja ajouté");
            });
    }
    idu(e) {
        alert(e);
    }
    handelmodal() {
        this.setState({ nomrecommander: "" });
        this.setState({ show: !this.state.show });
    }
    handelclose() {
        this.setState({ nomrecommander: "" });
        this.props.history.push(`/`);
    }

    recommanderCours(id, idcou, nomrec) {
        const v = this.state.idcours;

        let token = "";
        if (localStorage.getItem("token")) {
            token = localStorage.getItem("token");
            console.log("token", token);
        } else if (sessionStorage.getItem("token")) {
            token = sessionStorage.getItem("token");
        }

        axios.post("/api/courses/recommander", {
            courses_id: idcou,
            user_id: id
        });
        this.setState({ nomrecommander: nomrec });
    }
    render() {
        const alert1 = (
            <Alert variant="success">
                {" "}
                Cours bien recommandé à {this.state.nomrecommander} !
            </Alert>
        );
        const alert2 = "";
        return (
            <div>
                <div className="bod">
                    <h2>Detail cours</h2>
                    <div className="d-flex justify-content-around mb-3 cadre  p-4 ">
                        <div>
                            <div class="row">
                                <div>
                                    <div className="card">
                                        {/* {varpho=} */}
                                        <div class="card-img">
                                            <img
                                                src={
                                                    this.state.courses
                                                        .image_480x270
                                                }
                                                className="imgtaille"
                                            />
                                        </div>
                                        <div class="card-body">
                                            <h6>Star Rating</h6>
                                            <div>
                                                {this.state.courses.rating
                                                    ? [
                                                          ...Array(
                                                              parseInt(
                                                                  this.state.courses.avg_rating.toString()
                                                              )
                                                          )
                                                      ].map((x, i) => (
                                                          <i
                                                              className="fa fa-star color-start"
                                                              aria-hidden="true"
                                                              key={i}
                                                          ></i>
                                                      ))
                                                    : ""}
                                            </div>
                                            <span className="mx-2 text-secondary">
                                                <strong>
                                                    {this.state.courses.rating
                                                        ? this.state.courses
                                                              .rating
                                                        : ""}
                                                </strong>{" "}
                                                (
                                                {this.state.courses.num_reviews
                                                    ? this.state.courses
                                                          .num_reviews
                                                    : ""}
                                                )
                                            </span>
                                            {sessionStorage.token ||
                                            localStorage.token ? (
                                                <Fragment>
                                                    <button
                                                        onClick={this.addCours}
                                                        type="button"
                                                        class="btn btn-outline-danger btn-block btn-sm"
                                                    >
                                                        Ajouter
                                                    </button>
                                                    <button
                                                        onClick={
                                                            this.handelmodal
                                                        }
                                                        type="button"
                                                        class="btn btn-outline-danger btn-block btn-sm"
                                                    >
                                                        {" "}
                                                        Recommander{" "}
                                                    </button>
                                                </Fragment>
                                            ) : (
                                                ""
                                            )}

                                            <Modal show={this.state.show}>
                                                <Modal.Header>
                                                    <h5>
                                                        Recommander un cours
                                                    </h5>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    {this.state
                                                        .nomrecommander !== ""
                                                        ? alert1
                                                        : alert2}
                                                    <div className="card-body table-responsive p-0">
                                                        <table className="table table-striped table-valign-middle">
                                                            <thead>
                                                                <tr>
                                                                    <th>ID</th>
                                                                    <th>NOM</th>
                                                                    <th>
                                                                        E-MAIL
                                                                    </th>
                                                                    <th>
                                                                        Action
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {this.state.usersList.map(
                                                                    item => (
                                                                        <tr
                                                                            key={
                                                                                item.id
                                                                            }
                                                                        >
                                                                            <td>
                                                                                {" "}
                                                                                {
                                                                                    item.id
                                                                                }{" "}
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    item.name
                                                                                }
                                                                            </td>
                                                                            <td>
                                                                                {
                                                                                    item.email
                                                                                }{" "}
                                                                            </td>
                                                                            <td>
                                                                                <Button
                                                                                    onClick={() =>
                                                                                        this.recommanderCours(
                                                                                            item.id,
                                                                                            this
                                                                                                .state
                                                                                                .idcours,
                                                                                            item.name
                                                                                        )
                                                                                    }
                                                                                    variant="success"
                                                                                >
                                                                                    Valider
                                                                                </Button>{" "}
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                    {/* ---------------------------------------début modal ---------------------------*/}
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button
                                                        onClick={
                                                            this.handelclose
                                                        }
                                                    >
                                                        {" "}
                                                        Fermer{" "}
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>

                                            {/* ------------------------------------------fin modal -------------------------  */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3>{this.state.courses.title}</h3>
                            <h4>{this.state.courses.price}</h4>
                            <h4> crée par: </h4>
                            <h5>
                                {this.state.inst.map(item => (
                                    <p key={item.id}>
                                        {item.title} -{item.job_title}
                                    </p>
                                ))}{" "}
                            </h5>
                        </div>
                    </div>
                </div>

                {/* //////// */}

                {/* ////////////////*/}
                <div className="container  marge">
                    <div class="row d-flex justify-content-center">
                        <table class="table col-sm-8 ">
                            <thead class="thead-light">
                                <tr>
                                    <th scope="col">Contenu de cours</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.details.map(item => (
                                    <tr>
                                        <th key={item.id} scope="row">
                                            {item._class == "chapter" ? (
                                                <p>-{item.title} </p>
                                            ) : (
                                                <p style={{ color: "#b3d6de" }}>
                                                    {item.title}
                                                </p>
                                            )}
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* ///////////// */}
                <div className="container">
                    <div className="card my-5">
                        <div className="card-header">Description du cours</div>
                        <div className="card-body" id="mybody"></div>
                    </div>
                </div>

                <div className="container">
                    <h2 className="mb-3">Créateurs de cours</h2>

                    <div className="row">
                        {/* <!-- Team member --> */}
                        {this.state.inst.map(item => (
                            <div
                                key={item.id}
                                className="col-xs-12 col-sm-6 col-md-4"
                            >
                                <div className="image-flip">
                                    <div className="mainflip flip-0">
                                        <div className="frontside">
                                            <div className="card">
                                                <div className="card-body text-center">
                                                    <p>
                                                        <img
                                                            className=" img-fluid"
                                                            src={
                                                                item.image_100x100
                                                            }
                                                            alt={
                                                                this.state.inst
                                                                    .title
                                                            }
                                                        />
                                                    </p>
                                                    <h4 className="card-title">
                                                        {item.display_name}
                                                    </h4>
                                                    <p className="card-text">
                                                        {item.job_title}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="backside">
                                            <div className="card">
                                                <div className="card-body text-center mt-4">
                                                    <h4 className="card-title">
                                                        {this.state.job_title}
                                                    </h4>
                                                    <p className="card-text">
                                                        Ses publications is
                                                        basic card with image on
                                                        top, title, description
                                                        and button.This is basic
                                                        card with image on top,
                                                        title, description and
                                                        button.This is basic
                                                        card with image on top,
                                                        title, description and
                                                        button.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Detail;
