import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import axios from 'axios';

class TowarCud extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tow : {}
        };
    }
    componentDidMount() {
        axios({
            method: 'get',
            url: `http://localhost:8081/tow/${this.props.id}`,
        }).then((response) => {
            this.setState({tow: response.data})
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
                    <td><Form.Control as="input" placeholder="Nazwa" name="nTow" /></td>
                    <td><Form.Control as="input" placeholder="Kod kreskowy " name="kTow"/></td>
                    <td><Form.Control as="input" placeholder="Producent" name="pTow"/></td>
                    <td><Form.Control as="input" placeholder="Waga(kg)" name="wTow"/></td>
                    <td><Form.Control as="input" placeholder="Wymiary(cm)" name="wyTow"/></td>
                    <td><Button variant="outline-info" type="submit" className="towcud"> Dodaj </Button></td>
                </tr>
            );
        else if(this.props.typ === "update")
            return (
                <tr className="bg-light">
                    <td><Form.Control as="input" name="id" defaultValue={this.props.id}  readOnly  /></td>
                    <td><Form.Control as="input" placeholder="Nazwa" defaultValue={this.state.tow.ntow}  name="nTow" /></td>
                    <td><Form.Control as="input" placeholder="Kod kreskowy " defaultValue={this.state.tow.ktow} name="kTow"/></td>
                    <td><Form.Control as="input" placeholder="Producent" defaultValue={this.state.tow.ptow} name="pTow"/></td>
                    <td><Form.Control as="input" placeholder="Waga(kg)" defaultValue={this.state.tow.wtow} name="wTow"/></td>
                    <td><Form.Control as="input" placeholder="Wymiary(cm)" defaultValue={this.state.tow.wyTow} name="wyTow"/></td>
                    <td><Button variant="outline-info" type="submit" className="towcud"> Ok </Button></td>
                </tr>
            );
        else if(this.props.typ === "delete")
            return (
                <tr className="bg-light">
                    <td><Form.Control as="input" name="id" defaultValue={this.props.id}  readOnly  /></td>
                    <td colSpan={5} className="text-danger"> Czy na pewno chcesz usunąć towar?</td>
                    <td><Button variant="outline-info" type="submit" className="towcud"> Ok </Button></td>
                </tr>
            );
    }
}

export default TowarCud;