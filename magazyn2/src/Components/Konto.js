import React, {Component} from 'react';
import {Button, Table, Form, Container} from "react-bootstrap";
import axios from 'axios';
import Moment from 'moment';

class Konto extends Component {
    constructor(props){
        super(props);
        this.state = {
            history : [],
        };
    }
    componentDidMount() {
        axios.get(`http://localhost:8081/history/${localStorage.getItem('loginfo')}`).then((response) => {
            this.setState({history: response.data})
        });


    }


    render() {
        return (
            <div className="data-in-page">
                <Container className="data-in-page">
                        <Table>
                            <thead>
                            <tr>
                                <th>Rodzaj</th>
                                <th>Rodzaj ID</th>
                                <th>Typ</th>
                                <th>Data</th>

                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.history.map((element: any) => (
                                    <>
                                        <tr>
                                            <td>{element.rod}</td>
                                            <td>{element.idRod}</td>
                                            <td>{element.typ}</td>
                                            <td>{Moment(element.dat).format("DD-MM-YYYY hh:mm")}</td>
                                        </tr>

                                    </>
                                ) )
                            }
                            </tbody>
                        </Table>
                </Container>
            </div>
        );
    }
}

export default Konto;