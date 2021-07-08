import React, {Component} from 'react';
import {Button, Table, Form} from "react-bootstrap";
import MagazynCud from './MagazynCud'
import axios from 'axios';

class Magazyn extends Component {
    constructor(props){
        super(props);
        this.state = {
            mag : [],
            idClick : -1,
            render: false,
            typ : "",
            maxid : -1
        };
    }
   magClick(id, typ)
    {
        this.setState({idClick: id});
        this.setState({typ: typ});
        this.setState({render : !this.state.render});
    }
    
    componentDidMount() {
        axios({
            method: 'get',
            url: 'http://localhost:8081/mag/all',
        }).then((response) => {
            this.setState({mag: response.data})
            console.log(response.data)

        }).catch((error) => {
            console.log(error)
        });
    }
    render() {
        return (
            <Form action={"http://localhost:8081/mag/"+this.state.typ} method="post" className="magcud">
                <Table>
                    <thead>
                    <tr>
                        <th> ID Magazynu </th>
                        <th> Nazwa </th>
                        <th> Adresa </th>
                        <th> Kierownik magazynu </th>
                        <th> Telefon </th>
                        <th></th>
                        <th colSpan="2"><Button variant="outline-info" onClick={() => this.magClick(-1, "add")}>Dodaj
                            Magazyn</Button></th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.state.typ==="add" ? this.state.render && <MagazynCud typ={"add"} id={this.state.maxid+1}/> : '' }
                    {
                        this.state.mag.map((element: any) => (
                            <>
                                <tr>
                                    <td>{element.idMag}</td>
                                    <td>{element.nmag}</td>
                                    <td>{element.adres.ulica} {element.adres.bud} </td>
                                    <td>{element.kmag}</td>
                                    <td>{element.tmag}</td>
                                    <td><Button variant="outline-info"
                                                onClick={() => this.magClick(element.idMag, "details")}>Details</Button></td>
                                    <td><Button variant="outline-info"
                                                onClick={() => this.magClick(element.idMag, "update")}>Edytuj</Button></td>
                                    <td><Button variant="outline-info"
                                                onClick={() => this.magClick(element.idMag, "delete")}>Usun</Button></td>
                                </tr>
                                {this.state.idClick === element.idMag && this.state.typ === "details" ? this.state.render &&
                                    <MagazynCud id={element.idMag} typ={"details"}/> : ''}
                                {this.state.idClick === element.idMag && this.state.typ === "update" ? this.state.render &&
                                    <MagazynCud id={element.idMag} typ={"update"}/> : ''}
                                {this.state.idClick === element.idMag && this.state.typ === "delete" ? this.state.render &&
                                    <MagazynCud id={element.idMag} typ={"delete"}/> : ''}
                            </>
                        ) )
                    }
                    </tbody>
                </Table>
            </Form>
        );
    }
}

export default Magazyn;