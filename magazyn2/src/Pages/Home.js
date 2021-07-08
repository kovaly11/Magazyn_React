import React, {Component} from 'react';
import {Button,  Form, Container, Table} from "react-bootstrap";
import axios from 'axios';
import Moment from 'moment';
import DokumentyCud from '../Components/Dokumenty/DokumentyCud'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state={
            doks : [],
            data1 : null,
            data2 : null

        }

    }
    doksClick(id, typ)
    {
        this.setState({idClick: id});
        this.setState({typ: typ});
        this.setState({render : !this.state.render});
    }

    handleChangeData1 = (event) => {
        this.setState(
            {data1: event.target.value}
        )
    }
    handleChangeData2 = (event) => {
        this.setState(
            {data2: event.target.value}
        )
    }
    dataClick = event => {
        axios.get(`http://localhost:8081/doks/datasort?data1=${this.state.data1}&data2=${this.state.data2}`).then((response) => {
            this.setState({doks: response.data})
        })
    }


    render() {
        const {doks} = this.state;
        if (this.props.login > 0)
            return (
                <Container className="data-in-page">
                        <Form>
                        <Table>
                            <td>
                                <Form.Control className="mt-3" type="datetime-local" placeholder="Enter Data" name="data1" onChange={this.handleChangeData1}/>
                            </td>
                            <td>
                                <Form.Control className="mt-3" type="datetime-local" placeholder="Enter Data" name="data2" onChange={this.handleChangeData2}/>
                            </td>
                            <td>
                                <Button variant="outline-info" type={"button"}  className="dokdate mt-3" onClick={() => this.dataClick()}> Ok </Button>
                            </td>
                        </Table>
                        </Form>
                    <Form action={"http://localhost:8081/doks/"+this.state.typ} method="post" className="dokscud">
                        <Table>
                            <thead>
                            <tr>
                                <th>No</th>
                                <th>Magazyn</th>
                                <th>Typ Dokumentu</th>
                                <th>Firma/Magazyn</th>
                                <th >Data</th>
                            </tr>
                            </thead>

                            <tbody>
                            { this.state.typ==="add" ? this.state.render && <DokumentyCud typ={"add"}/> : '' }
                            {

                                doks.map((element: any) => (

                                    <>
                                        <tr>
                                            <td>{element.idDok}</td>
                                            <td>{element.mag.nmag}</td>
                                            <td>{element.tdok}</td>
                                            <td>{element.idF}</td>
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

export default Home;