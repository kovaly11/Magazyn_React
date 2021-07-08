import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import axios from 'axios';

class MagazynCud extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adres : [],
            stan : [],
            mag :{}
        };
    }
    dateClick(typ) {
        var bodyFormData = new FormData();
        bodyFormData.append('idPrac', localStorage.getItem('loginfo'));
        bodyFormData.append('rod', 'magazyn');
        bodyFormData.append('idRod', this.props.id);
        bodyFormData.append('typ', typ);
        bodyFormData.append('dat', new Date().toLocaleString());

        axios({
            method: 'post',
            url: 'http://localhost:8081/history/add',
            data: bodyFormData
        }) .then((response) => {
            this.setState({doks: response.data})
        }).catch((error) => {
            console.log(error)
        });
    }
    componentDidMount() {
        axios({
            method: 'get',
            url: `http://localhost:8081/mag/${this.props.id}`,
        }).then((response) => {
            this.setState({mag: response.data})
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

        axios({
            method: 'get',
            url: `http://localhost:8081/stanmag/all`,
        }).then((response) => {
            this.setState({stan: response.data})
            console.log(response.data)

        }).catch((error) => {
            console.log(error)
        });
    }
    render() {
     if(this.props.typ === "details")
            return (
                <>
                    <tr className="bg-light">

                        <th> </th>
                        <th> Towar </th>
                        <th> Numer serijny</th>
                        <th> Ilosc </th>
                        <th></th>

                    </tr>
                    {
                        this.state.stan.map((element: any) => (
                            this.props.id === element.idMag ?
                                <tr className="bg-light">
                                    <td></td>
                                    <td>{element.tow.ntow}</td>
                                    <td>{element.serTow}</td>
                                    <td>{element.ilTow}</td>
                                    <td></td>
                                </tr>
                                : ''

                        ) )
                    }
                </>
            );
        else if(this.props.typ === "add")
            return (
                <tr className="bg-light">
                    <td></td>
                    <td><Form.Control as="input" placeholder="Nazwa" name="nMag" /></td>
                    <td>
                        <Form.Control as="select"  name="idAd">
                            {
                                this.state.adres.map((element: any) => (
                                    <option value={element.idAd}>{element.ulica} {element.bud} {element.mej} {element.kraj}</option>
                                ))
                            }
                        </Form.Control>
                    </td>
                    <td><Form.Control as="input" placeholder="Kierownik magazynu" name="kMag"/></td>
                    <td><Form.Control as="input" placeholder="Telefon" name="tMag"/></td>
                    <td><Button variant="outline-info" type="submit" className="magcud" onClick={() => this.dateClick("add")}> Dodaj </Button></td>
                </tr>
            );
        else if(this.props.typ === "update")
            return (
                <tr className="bg-light">
                    <td><Form.Control as="input" name="id" defaultValue={this.props.id}  readOnly  /></td>
                    <td><Form.Control as="input" placeholder="Nazwa" defaultValue={this.state.mag.nmag}  name="nMag" /></td>
                    <td>
                        <Form.Control as="select"  name="idAd">
                            {
                                this.state.adres.map((element: any) => (
                                    <option value={element.idAd}>{element.ulica} {element.bud} {element.mej} {element.kraj}</option>
                                ))
                            }
                        </Form.Control>
                    </td>
                    <td><Form.Control as="input" placeholder="Kierownik magazynu" defaultValue={this.state.mag.kmag}  name="kMag"/></td>
                    <td><Form.Control as="input" placeholder="Telefon" defaultValue={this.state.mag.tmag}  name="tMag"/></td>
                    <td><Button variant="outline-info" type="submit"  className="magcud" onClick={() => this.dateClick("update")}> Ok </Button></td>
                    </tr>
            );
        else if(this.props.typ === "delete")
            return (
                <tr className="bg-light">
                    <td><Form.Control as="input" name="id" defaultValue={this.props.id}  readOnly  /></td>
                    <td colSpan={5} className="text-danger"> Czy na pewno chcesz usunąć magazyn?</td>
                    <td><Button variant="outline-info" type="submit" className="magcud" onClick={() => this.dateClick("delete")}> Ok </Button></td>
                </tr>
            );
    }
}

export default MagazynCud;