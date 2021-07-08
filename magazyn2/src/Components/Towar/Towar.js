import React, {Component} from 'react';
import {Button, Table, Form} from "react-bootstrap";
import TowarCud from './TowarCud'
import axios from 'axios';

class Towar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tow :[],
            idClick : -1,
            render: false,
            typ : "",
            str : null
        };
    }
    handleChangeStr = (event) => {
        this.setState(
            {str: event.target.value.toLowerCase()}
        )
    }
    findByStr(){
        axios.get(`http://localhost:8081/tow/find?str=${this.state.str}`).then((response) => {
            this.setState({tow: response.data})
        })
    }
    towarClick(id, typ)
    {
        this.setState({idClick: id});
        this.setState({typ: typ});
        this.setState({render : !this.state.render});
    }
    componentDidMount() {
        axios({
            method: 'get',
            url: 'http://localhost:8081/tow/all',
        }).then((response) => {
            this.setState({tow: response.data})
            console.log(response.data)

        }).catch((error) => {
            console.log(error)
        });
    }
    render() {
        return (
            <>
             <Form className={"mt-3"}>
                 <Table className="bg-light">
                 <td><Form.Control as="input" placeholder="Wpisz nazwe towaru" onChange={this.handleChangeStr}/></td>
                 <td><Button variant="outline-info" onClick={() => this.findByStr()} >Szukaj</Button></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                     <td></td>
                 </Table>
             </Form>
            <Form action={"http://localhost:8081/tow/"+this.state.typ} method="post" className="towcud">
            <Table>
                <thead>
                <tr>
                    <th> ID Towaru</th>
                    <th> Nazwa</th>
                    <th> Kod kreskowy </th>
                    <th> Producent </th>
                    <th> Waga(kg)</th>
                    <th>Wymiary(cm)</th>
                    <th colSpan="2"><Button variant="outline-info" onClick={() => this.towarClick(-1, "add")}>Dodaj Towar</Button></th>
                </tr>
                </thead>
                <tbody>
                { this.state.typ==="add" ? this.state.render && <TowarCud typ={"add"}/> : '' }
                {
                    this.state.tow.map((element: any) => (
                        <>
                        <tr>
                            <td>{element.idTow}</td>
                            <td>{element.ntow}</td>
                            <td>{element.ktow}</td>
                            <td>{element.ptow}</td>
                            <td>{element.wtow}</td>
                            <td>{element.wyTow}</td>
                            <td><Button variant="outline-info" onClick={() => this.towarClick(element.idTow, "update")}>Edytuj</Button></td>
                            <td><Button variant="outline-info" onClick={() => this.towarClick(element.idTow, "delete")}>Usun</Button></td>
                        </tr>
                            { this.state.idClick === element.idTow && this.state.typ==="update" ? this.state.render && <TowarCud id={element.idTow} typ={"update"}/> : '' }
                            { this.state.idClick === element.idTow && this.state.typ==="delete" ? this.state.render && <TowarCud id={element.idTow} typ={"delete"}/> : '' }
                        </>
                    ) )
                }
                </tbody>
            </Table>
            </Form>
            </>
        );

    }
}

export default Towar;