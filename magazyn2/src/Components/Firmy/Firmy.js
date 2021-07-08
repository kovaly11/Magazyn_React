import React, {Component} from 'react';
import {Button, Table, Form} from "react-bootstrap";
import FirmyCud from './FirmyCud'
import axios from 'axios';


class Firmy extends Component {
    constructor(props){
        super(props);
        this.state = {
            firmy : [],
            idClick : -1,
            render: false,
            typ : ""
        };
    }
    firmyClick(id, typ)
    {
        this.setState({idClick: id});
        this.setState({typ: typ});
        this.setState({render : !this.state.render});
    }
    componentDidMount() {
        axios({
            method: 'get',
            url: 'http://localhost:8081/firmy/all',
        }).then((response) => {
            this.setState({firmy: response.data})
            console.log(response.data)

        }).catch((error) => {
            console.log(error)
        });
    }
    render() {
        return (
            <Form action={"http://localhost:8081/firmy/"+this.state.typ} method="post" className="firmycud">
                <Table>
                    <thead>
                    <tr>
                        <th> ID Firmy</th>
                        <th> Typ Firmy</th>
                        <th> Nazwa</th>
                        <th>Pelna Nazwa</th>
                        <th> NIP</th>
                        <th> PESEL</th>
                        <th>Adresa</th>
                        <th> Osoba Kontaktowa</th>
                        <th> Telefon</th>
                        <th> Email</th>
                        <th colSpan="2"><Button variant="outline-info" onClick={() => this.firmyClick(-1, "add")}>Dodaj
                            Firme</Button></th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.state.typ==="add" ? this.state.render && <FirmyCud typ={"add"}/> : '' }
                    {
                        this.state.firmy.map((element: any) => (
                        <>
                        <tr>
                            <td>{element.idF}</td>
                            <td>{element.tfir}</td>
                            <td>{element.snaz}</td>
                            <td>{element.pnaz}</td>
                            <td>{element.nip}</td>
                            <td>{element.pesel}</td>
                            <td>{element.adres.ulica} {element.adres.bud}</td>
                            <td>{element.osoba}</td>
                            <td>{element.tel}</td>
                            <td>{element.email}</td>
                            <td><Button variant="outline-info"
                                        onClick={() => this.firmyClick(element.idF, "update")}>Edytuj</Button></td>
                            <td><Button variant="outline-info"
                                        onClick={() => this.firmyClick(element.idF, "delete")}>Usun</Button></td>
                        </tr>
                        {this.state.idClick === element.idF && this.state.typ === "update" ? this.state.render &&
                            <FirmyCud id={element.idF} typ={"update"}/> : ''}
                        {this.state.idClick === element.idF && this.state.typ === "delete" ? this.state.render &&
                            <FirmyCud id={element.idF} typ={"delete"}/> : ''}
                    </>
                    ) )
                    }
                    </tbody>
                </Table>
            </Form>
        );
    }
}

export default Firmy;