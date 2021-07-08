import React, {Component} from 'react';
import {Button, Form, Table} from "react-bootstrap";
import axios from 'axios';
import PozycjaCud from '../Dokumenty/PozycjaCud'

class DokumentyCud extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doks : [],
            doki : [],
            dok :{},
            mag:[]
        };
    }
    pozycjaClick(id, typ)
    {
        this.setState({idClick: id});
        this.setState({typ: typ});
        this.setState({render : !this.state.render});
    }
    dateClick(typ) {
        var bodyFormData = new FormData();
        bodyFormData.append('idPrac', localStorage.getItem('loginfo'));
        bodyFormData.append('rod', 'dokumenty');
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
            url: `http://localhost:8081/doks/${this.props.id}`,
        }).then((response) => {
            this.setState({dok: response.data})
            console.log(response.data)

        }).catch((error) => {
            console.log(error)
        });
        axios({
            method: 'get',
            url: `http://localhost:8081/doki/${this.props.id}`,
        }).then((response) => {
            this.setState({doki: response.data})
            console.log(response.data)

        }).catch((error) => {
            console.log(error)
        });

        axios({
            method: 'get',
            url: `http://localhost:8081/doks/all`,
        }).then((response) => {
            this.setState({doks: response.data})
            console.log(response.data)

        }).catch((error) => {
            console.log(error)
        });
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
        if(this.props.typ === "details")
        return (
            <Form action={"http://localhost:8081/doki/"+this.state.typ} method="post" className="pozcud">
            <Table>
                <thead>
                <tr className="bg-light">

                    <th> </th>
                    <th> No </th>
                    <th> Towar </th>
                    <th> Numer serijny</th>
                    <th> Ilosc </th>
                    <th colSpan={2}><Button variant="outline-info" onClick={() => this.pozycjaClick(-1, "add")}>Dodaj Pozycje</Button></th>
                </tr>
                </thead>
                <tbody>
                { this.state.typ==="add" ? this.state.render && <PozycjaCud typ={this.state.typ} id={this.props.id} dok={this.state.dok}/> : '' }
                {
                    this.state.doki.map((element: any) => (
                        this.props.id === element.idDok ?
                            <>
                            <tr className="bg-light">
                                <td></td>
                                <td>{element.lpoz}</td>
                                <td>{element.tow.ntow}</td>
                                <td>{element.serTow}</td>
                                <td>{element.ilTow}</td>
                                <td><Button variant="outline-info" onClick={() => this.pozycjaClick(element.lpoz, "update")}>Edytuj</Button></td>
                                <td><Button variant="outline-info" onClick={() => this.pozycjaClick(element.lpoz, "delete")}>Usun</Button></td>
                            </tr>
                                {this.state.idClick === element.lpoz && this.state.typ === "update" ? this.state.render &&
                                    <PozycjaCud id={this.props.id} poz={element.lpoz} typ={"update"}/> : ''}
                                {this.state.idClick === element.lpoz && this.state.typ === "delete" ? this.state.render &&
                                    <PozycjaCud id={this.props.id} poz={element.lpoz} typ={"delete"}/> : ''}
                            </>
                            : ''

                    ) )
                }
                </tbody>
            </Table>
            </Form>
        );
        else if(this.props.typ === "add")
            return (
                <tr className="bg-light">
                    <td></td>
                    <td>
                        <Form.Control as="select"  name="idMag">
                            {
                                this.state.mag.map((element: any) => (
                                    <option value={element.idMag}>{element.nmag}</option>
                                ))
                            }
                        </Form.Control>
                    </td>
                    <td>
                    <Form.Control as="select"  name="tDok">
                        <option value={"PT"}>Przyjęcie towaru</option>
                        <option value={"RT"}>Rozchód towaru</option>
                        <option value={"IN"}>Inwentaryzacja – niedobór</option>
                        <option value={"IW"}>Inwentaryzacja - nadmiar</option>
                        <option value={"PR"}>Przesunięcie międzymagazynow</option>

                    </Form.Control>
                    </td>
                    <td><Form.Control as="input" placeholder="Firma" name="idF"/></td>
                    <td><Form.Control type="datetime-local" placeholder="Enter Data" name="data" /></td>
                    <td><Button variant="outline-info" type="submit" className="dokscud" onClick={() => this.dateClick("add")}> Dodaj </Button></td>
                </tr>
            );
        else if(this.props.typ === "delete")
            return (
                <tr className="bg-light">
                    <td><Form.Control as="input" name="id" defaultValue={this.props.id}  readOnly  /></td>
                    <td colSpan={5} className="text-danger"> Czy na pewno chcesz usunąć dokument?</td>
                    <td><Button variant="outline-info" type="submit" className="magcud" onClick={() => this.dateClick("delete")}> Ok </Button></td>
                </tr>
            );
        else
        return (
            <div>
                {this.props.typ}
            </div>
        );
    }
}

export default DokumentyCud;