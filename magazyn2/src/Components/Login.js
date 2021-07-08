import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import axios from 'axios';
import Header from '../Components/Header'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: null,
            haslo: null,
            loginfo : -1,
            renderlog: false,

        }
        this.logClick = this.logClick.bind(this)
        //localStorage.setItem('loginfo' , -1)


    }
    handleSubmin = (event) => {
        event.preventDefault();
    }
    handleChangeLogin = (event) => {
        this.setState(
            {login: event.target.value}
        )
    }
    handleChangeHaslo = (event) => {
        this.setState(
            {haslo: event.target.value}
        )
    }
    logClick = event => {
        axios.get(`http://localhost:8081/pracownik/log?login=${this.state.login}&haslo=${this.state.haslo}`).then((response) => {
            this.setState({loginfo: response.data})
            window.location.replace('/')
            localStorage.setItem('loginfo' , this.state.loginfo)
        })


    }

    render() {
        return (
            <>
                <Header login={localStorage.getItem('loginfo') } typ={"login"}/>
            {localStorage.getItem('loginfo') < 0 && this.props.loginfo !==1 ?

            <div className="login-in-page">
                <Form onSubmit={this.handleSubmit} className="log">
                    <Form.Label>Login</Form.Label>
                    <Form.Control type="input" placeholder="Login" name="login" onChange={this.handleChangeLogin.bind(this)}/>
                    <Form.Label>Haslo</Form.Label>
                    <Form.Control type="password" placeholder="Haslo" name="haslo" onChange={this.handleChangeHaslo} />
                    <Button variant="outline-info" type="submit" className="log mt-3" onClick={() => this.logClick()}> LogIn </Button>
                </Form>
            </div>

                : <Header login={localStorage.getItem('loginfo')} typ ={"home"} />}
            </>
        );
    }
}

export default Login;