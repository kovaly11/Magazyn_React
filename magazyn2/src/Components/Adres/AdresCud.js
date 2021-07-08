import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import axios from 'axios';

class AdresCud extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adres : {}
        };
    }
    componentDidMount() {
        axios({
            method: 'get',
            url: `http://localhost:8081/adres/${this.props.id}`,
        }).then((response) => {
            this.setState({adres: response.data})
            console.log(response.data)

        }).catch((error) => {
            console.log(error)
        });
    }
    render() {
        if(this.props.typ === "add")
        return (
            <tr className="bg-light">
                <td></td>
                <td><Form.Control as="input" placeholder="Ulica" name="ulica" /></td>
                <td><Form.Control as="input" placeholder="Budynek" name="bud"/></td>
                <td><Form.Control as="input" placeholder="Mejscowosc" name="mej"/></td>
                <td><Form.Control as="input" placeholder="Kod Pocztowy" name="kod"/></td>
                <td><Form.Control as="input" placeholder="Kraj" name="kraj"/></td>
                <td><Button variant="outline-info" type="submit" className="adrescud"> Dodaj </Button></td>
            </tr>
        );
        else if(this.props.typ === "update")
            return (
                <tr className="bg-light">
                    <td><Form.Control as="input" name="id" defaultValue={this.props.id}  readOnly  /></td>
                    <td><Form.Control as="input" placeholder="Ulica" defaultValue={this.state.adres.ulica} name="ulica" /></td>
                    <td><Form.Control as="input" placeholder="Budynek" defaultValue={this.state.adres.bud} name="bud"/></td>
                    <td><Form.Control as="input" placeholder="Mejscowosc" defaultValue={this.state.adres.mej}  name="mej"/></td>
                    <td><Form.Control as="input" placeholder="Kod Pocztowy" defaultValue={this.state.adres.kod}  name="kod"/></td>
                    <td><Form.Control as="input" placeholder="Kraj" defaultValue={this.state.adres.kraj}  name="kraj"/></td>
                    <td><Button variant="outline-info" type="submit" className="adrescud"> Ok </Button></td>
                </tr>
            );
        else if(this.props.typ === "delete")
            return (
                <tr className="bg-light">
                    <td><Form.Control as="input" name="id" defaultValue={this.props.id}  readOnly  /></td>
                    <td colSpan={5} className="text-danger"> Czy na pewno chcesz usunąć adres?</td>
                    <td><Button variant="outline-info" type="submit" className="adrescud"> Ok </Button></td>
                </tr>
            );
    }
}

export default AdresCud;