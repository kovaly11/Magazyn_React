import React, {Component} from 'react';
import {Button, Table, Form, Container} from "react-bootstrap";
import DokumentyCud from '../Components/Dokumenty/DokumentyCud'
import axios from 'axios';
import Moment from 'moment';

class Dokumenty extends Component {
    constructor(props){
        super(props);
        this.state = {
            doks : [],
            idClick : -1,
            render: false,
            typ : "",
            firmy :[],
            mag :[],
            nazwaMag : new Map(),
            nazwaFirmy : new Map(),
            dataclick : false,
            maxid :-1
        };
    }
    doksClick(id, typ)
    {
        this.setState({idClick: id});
        this.setState({typ: typ});
        this.setState({render : !this.state.render});
    }
    sort = (typ) =>
    {
        if(typ === "data" && !this.state.dataclick) {
            axios.get('http://localhost:8081/doks/sort').then((response) => {
                this.setState({doks: response.data})
            })
            this.setState({dataclick : !this.state.dataclick});
        }
        else if(typ === "data" && this.state.dataclick){
            axios.get('http://localhost:8081/doks/sortdesc').then((response) => {
                this.setState({doks: response.data})
            })
            this.setState({dataclick : !this.state.dataclick});
        }

    }

    componentDidMount() {
        axios({
            method: 'get',
            url: 'http://localhost:8081/doks/all',
        }).then((response) => {
            this.setState({doks: response.data})
        }).catch((error) => {
            console.log(error)
        });

        axios.get(`http://localhost:8081/firmy/all`).then((response) => {
            this.setState({firmy: response.data})
        })
        axios.get(`http://localhost:8081/mag/all`).then((response) => {
            this.setState({mag: response.data})
        })

    }
    render() {
        this.state.firmy.map((element: any) => (
            this.state.nazwaFirmy.set(element.idF, element.pnaz)
        ))
        this.state.mag.map((element: any) => (
            this.state.nazwaMag.set(element.idMag, element.nmag)
        ))
        if (this.props.login > 0)
        return (

                <Container className="data-in-page">
                    <Form action={"http://localhost:8081/doks/"+this.state.typ} method="post" className="dokscud">
                        <Table>
                            <thead>
                            <tr>
                                <th>No</th>
                                <th onClick={() => this.sort()} className="click-text">Magazyn</th>
                                <th>Typ Dokumentu</th>
                                <th>Firma/Magazyn</th>
                                <th onClick={() => this.sort("data")} className="click-text">Data</th>
                                <th colSpan="2"><Button variant="outline-info" onClick={() => this.doksClick(-1, "add")}>Dodaj
                                    Dokument</Button></th>
                            </tr>
                            </thead>
                            <tbody>
                            { this.state.typ==="add" ? this.state.render && <DokumentyCud typ={"add"} id={this.state.maxid+1} /> : '' }
                            {
                                this.state.doks.map((element: any) => (
                                    <>
                                        <tr>
                                            <td>{element.idDok}</td>
                                            <td>{element.mag.nmag}</td>
                                            <td>{element.tdok}</td>
                                            <td>{element.tdok ==="PP" || element.tdok === "PR" ? this.state.nazwaMag.get(element.idF) : this.state.nazwaFirmy.get(element.idF) }</td>
                                            <td>{Moment(element.data).format("DD-MM-YYYY hh:mm")}</td>
                                            <td><Button variant="outline-info"
                                                        onClick={() => this.doksClick(element.idDok, "details")}>Details</Button></td>
                                            <td><Button variant="outline-info"
                                                        onClick={() => this.doksClick(element.idDok, "delete")}>Usun</Button></td>
                                        </tr>

                                        {this.state.idClick === element.idDok && this.state.typ === "details" ? this.state.render &&
                                            <td colSpan="6"><DokumentyCud id={element.idDok} typ={"details"}/></td> : ''}
                                        {this.state.idClick === element.idDok && this.state.typ === "delete" ? this.state.render &&
                                            <DokumentyCud id={element.idDok} typ={"delete"}/> : ''}
                                    </>
                                ) )
                            }
                            </tbody>
                        </Table>
                    </Form>
                </Container>
        );
        else
            return (
                <div className="data-in-page"> <h2 class="text-danger">Login error</h2></div>
            );
    }
}

export default Dokumenty;