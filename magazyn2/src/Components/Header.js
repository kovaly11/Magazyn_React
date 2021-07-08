import React, {Component} from 'react';
import {Button, Container, Form, Nav, Navbar} from "react-bootstrap";

import logo from './logo.png'
import Home from "../Pages/Home";
import Dokumenty from "../Pages/Dokumenty";
import Dane from "../Pages/Dane";
import Login from "../Components/Login"
import axios from 'axios';
import Konto from '../Components/Konto'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logininfo : null,
            renderhome: true,
            renderdok: false,
            renderdane: false,
            renderlog: false,
            renderkonto : false,
            typ : "login",
            prac : {}
        };
        this.state.typ = this.props.typ;
    }
    headerClick(typ) {
        this.setState({typ: typ});
        if (typ === "dok")
            this.setState({renderdok: true});
        else if (typ === "dane")
            this.setState({renderdane: true});
        else if (typ === "home")
            this.setState({renderhome: true});
        else if (typ === "konto")
            this.setState({renderkonto: true});
        else if (typ === "login"){
            this.setState({renderlog: true});
            this.setState({logininfo: 1});
        }
        else if (typ === "out") {
            localStorage.setItem('loginfo', -1);
            this.setState({logininfo: -1});
            this.setState({renderlog: true});
        }
    }
    componentDidMount() {
        axios({
            method: 'get',
            url: `http://localhost:8081/pracownik/${this.props.login}`,
        }).then((response) => {
            this.setState({prac: response.data}
            )

        }).catch((error) => {
            console.log(error)
        });
    }

    render() {
        return (
            <>
                <Navbar fixed="top" collapseOnSelect expand="md" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand onClick={() => this.headerClick("home")} className="click-text">
                        <img
                            src={logo}
                            height="30"
                            width="30"
                            className="d-inline-block align-top"
                            alt="logo"
                        /> Magazyn
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link onClick={() => this.headerClick("dok")}>Dokumenty</Nav.Link>
                            <Nav.Link onClick={() => this.headerClick("dane")}>Dane</Nav.Link>
                        </Nav>
                        <Form inline>
                            {this.props.login < 0 ?
                                <Button variant="outline-info"
                                        onClick={() => this.headerClick("login")}>Logowanie</Button>
                                :
                                <><Button variant="outline-info" onClick={() => this.headerClick("konto")}>{this.state.prac.imie} {this.state.prac.nazw}</Button><Button variant="outline-info"
                                        onClick={() => this.headerClick("out")}>Wyjście</Button></>
                            }
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

                { this.state.typ==="dok" ? this.state.renderdok && <Dokumenty login={this.props.login}/> : '' }
                { this.state.typ==="home" ?  this.state.renderhome &&  <Home login={this.props.login}/> : '' }
                { this.state.typ==="dane" ? this.state.renderdane && <Dane login={this.props.login}/>  : '' }
                {this.state.typ==="login" || this.state.typ==="out" ? this.state.renderlog && <Login loginfo={this.state.logininfo}/> : ''}
                { this.state.typ==="konto" ? this.state.renderkonto&& <Konto/> : '' }
                       </>
        );
    }
}

export default Header;