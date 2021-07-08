import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import axios from 'axios';

class FirmyCud extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adres : [],
            firma :{}
        };
    }
    componentDidMount() {
        axios({
            method: 'get',
            url: `http://localhost:8081/firmy/${this.props.id}`,
        }).then((response) => {
            this.setState({firma: response.data})
            console.log(response.data)

        }).catch((error) => {
            console.log(error)
        });
        axios({
            method: 'get',
            url: `http://localhost:8081/adres/all`,
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
                    <td><Form.Control as="input" placeholder="Typ Firmy" name="tFir"/></td>
                    <td><Form.Control as="input" placeholder="Nazwa" name="sNaz"/></td>
                    <td><Form.Control as="input" placeholder="Pelna Nazwa" name="pNaz"/></td>
                    <td><Form.Control as="input" placeholder="NIP" name="nip"/></td>
                    <td><Form.Control as="input" placeholder="PESEL" name="pesel" /></td>
                    <td>
                        <Form.Control as="select"  name="idAd">
                            {
                                this.state.adres.map((element: any) => (
                                    <option value={element.idAd}>{element.ulica} {element.bud} {element.mej} {element.kraj}</option>
                                ))
                            }
                        </Form.Control>
                    </td>
                    <td><Form.Control as="input" placeholder="Osoba Kontaktowa	" name="osoba"/></td>
                    <td><Form.Control as="input" placeholder="Telefon" name="tel"/></td>
                    <td><Form.Control as="input" placeholder="Email" name="email"/></td>
                    <td><Button variant="outline-info" type="submit" className="firmycud"> Dodaj </Button></td>
                </tr>
            );
        else if(this.props.typ === "update")
            return (
                     <tr className="bg-light">
                    <td><Form.Control as="input" name="id" defaultValue={this.props.id}  readOnly  /></td>
                     <td><Form.Control as="input" placeholder="Typ Firmy" defaultValue={this.state.firma.tfir}  name="tFir"/></td>
                    <td><Form.Control as="input" placeholder="Nazwa" defaultValue={this.state.firma.snaz}  name="sNaz"/></td>
                    <td><Form.Control as="input" placeholder="Pelna Nazwa" defaultValue={this.state.firma.pnaz}  name="pNaz"/></td>
                    <td><Form.Control as="input" placeholder="NIP" defaultValue={this.state.firma.nip}  name="nip"/></td>
                    <td><Form.Control as="input" placeholder="PESEL" defaultValue={this.state.firma.pesel}  name="pesel" /></td>
                    <td>
                        <Form.Control as="select"  name="idAd">
                            {
                                this.state.adres.map((element: any) => (
                                    <option value={element.idAd}>{element.ulica} {element.bud} {element.mej} {element.kraj}</option>
                                ))
                            }
                        </Form.Control>
                    </td>
                    <td><Form.Control as="input" placeholder="Osoba Kontaktowa	" defaultValue={this.state.firma.osoba}  name="osoba"/></td>
                    <td><Form.Control as="input" placeholder="Telefon" defaultValue={this.state.firma.tel}  name="tel"/></td>
                    <td><Form.Control as="input" placeholder="Email" defaultValue={this.state.firma.email}  name="email"/></td>
                    <td><Button variant="outline-info" type="submit" className="firmycud"> Ok </Button></td>
                </tr>
            );
        else if(this.props.typ === "delete")
            return (
                <tr className="bg-light">
                    <td><Form.Control as="input" name="id" defaultValue={this.props.id}  readOnly  /></td>
                    <td colSpan={5} className="text-danger"> Czy na pewno chcesz usunąć firme?</td>
                    <td><Button variant="outline-info" type="submit" className="firmycud"> Ok </Button></td>
                </tr>
            );
    }
}

export default FirmyCud;