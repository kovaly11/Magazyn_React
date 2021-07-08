import React, {Component} from 'react';
import {Button, Table, Form} from "react-bootstrap";
import AdresCud from './AdresCud'
import axios from 'axios';

class Adres extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adres : [],
            idClick : -1,
            render: false,
            typ : ""
        };
    }
    adresClick(id, typ)
    {
        this.setState({idClick: id});
        this.setState({typ: typ});
        this.setState({render : !this.state.render});
    }
    componentDidMount() {
        axios({
            method: 'get',
            url: 'http://localhost:8081/adres/all',
        }).then((response) => {
            this.setState({adres: response.data})
            console.log(response.data)

        }).catch((error) => {
            console.log(error)
        });
    }

    render() {
        return (
            <Form action={"http://localhost:8081/adres/"+this.state.typ} method="post" className="adrescud">
            <Table>
                <thead>
                <tr>
                    <th> ID Adresy </th>
                    <th> Ulica </th>
                    <th> Budynek </th>
                    <th> Mejscowosc </th>
                    <th> Kod Pocztowy </th>
                    <th> Kraj </th>
                    <th colSpan="2"><Button variant="outline-info" onClick={() => this.adresClick(-1, "add")}>Dodaj Adres</Button></th>
                </tr>
                </thead>
                <tbody>
                { this.state.typ==="add" ? this.state.render && <AdresCud typ={"add"}/> : '' }
                {
                    this.state.adres.map((element: any) => (
                        <>
                        <tr>
                            <td>{element.idAd}</td>
                            <td>{element.ulica}</td>
                            <td>{element.bud}</td>
                            <td>{element.mej}</td>
                            <td>{element.kod}</td>
                            <td>{element.kraj}</td>
                            <td><Button variant="outline-info" onClick={() => this.adresClick(element.idAd, "update")}>Edytuj</Button></td>
                            <td><Button variant="outline-info" onClick={() => this.adresClick(element.idAd, "delete")}>Usun</Button></td>
                        </tr>
                            { this.state.idClick === element.idAd && this.state.typ==="update" ? this.state.render && <AdresCud id={element.idAd} typ={"update"}/> : '' }
                            { this.state.idClick === element.idAd && this.state.typ==="delete" ? this.state.render && <AdresCud id={element.idAd} typ={"delete"}/> : '' }
                        </>
                    ) )
                }
                </tbody>
            </Table>
            </Form>
        );
    }
}

export default Adres;