import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import axios from 'axios';


class PozycjaCud extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tow : [],
            poz :{},
            stanmag :[],
            stanmagser :[],
            selectTow : -1,
            first : 0
        };
    }
    componentDidMount() {
        axios({
            method: 'get',
            url: `http://localhost:8081/doki/${this.props.id}/${this.props.poz}`,
        }).then((response) => {
            this.setState({poz: response.data})
            console.log(response.data)

        }).catch((error) => {
            console.log(error)
        });
        axios({
            method: 'get',
            url: `http://localhost:8081/tow/all`,
        }).then((response) => {
            this.setState({tow: response.data})
            console.log(response.data)

        }).catch((error) => {
            console.log(error)
        });

        axios({
            method: 'get',
            url: `http://localhost:8081/stanmag/tow/${this.props.dok.mag.idMag}`,
        }).then((response) => {
            this.setState({stanmag: response.data})
            console.log(response.data)

        }).catch((error) => {
            console.log(error)
        });

    }
    handleChangeTow = (event) => {
        event.preventDefault()
        this.setState(
            {selectTow: event.target.value}
        )
        this.getstan();
    }
    handleChangeSer = (event) => {
        this.getstan();
    }
    getstan(){

        axios.get( `http://localhost:8081/stanmag/${this.props.dok.mag.idMag}/${this.state.selectTow}`)
            .then((response) => {
                this.setState({stanmagser: response.data})
            });
        console.log(this.state.stanmagser)
    }

      
    render() {
         if(this.props.typ === "add")
                return (

                    <tr className="bg-light">
                        <td><Form.Control as="input" name="idDok" defaultValue={this.props.id}  readOnly  /></td>
                        <td></td>
                        <td>
                            {this.props.dok.tdok === "PT" || this.props.dok.tdok === "IW" || this.props.dok.tdok === "IN" ?
                                <Form.Control as="select" name="idTow" onChange={this.handleChangeTow} >
                                    {

                                        this.state.tow.map((element: any) => (
                                            <option value={element.idTow}>{element.ntow}</option>
                                        ))
                                    }
                                </Form.Control>
                                :
                                <Form.Control as="select" name="idTow" placeholder="Numer serijny" onChange={this.handleChangeTow} onClick={()=>this.getstan()}>
                                    <option selected value={0}>Wybierz towar</option>
                                    {

                                        this.state.stanmag.map((element: any) => (
                                            <option value={element.idTow}>{element.ntow}</option>
                                        ))
                                                                          }
                                </Form.Control>
                            }
                        </td>
                        <td>
                            {this.props.dok.tdok === "PT" || this.props.dok.tdok === "IW" || this.props.dok.tdok === "IN" ?
                            <Form.Control as="input" placeholder="Numer serijny" name="serTow" />
                                :
                            <Form.Control as="select" placeholder="Numer serijny" name="serTow" onChange={this.handleChangeSer} onClick={()=>this.getstan()}>
                                {
                                    this.state.stanmagser.map((element: any) => (

                                     //if(element.element.tow.idTow === this.state.selectTow)
                                    <option value={element.serTow}>{element.serTow}</option>

                                    ))
                                }
                            </Form.Control>
                                }
                        </td>
                        <td><Form.Control as="input" placeholder="Ilosc" name="ilTow"/></td>
                        <td><Button variant="outline-info" type="submit" className="pozcud"> Dodaj </Button></td>
                    </tr>
                );

        else  if(this.props.typ === "delete")
             return (
                 <tr className="bg-light">
                     <td><Form.Control as="input" name="idDok" defaultValue={this.props.id}  readOnly  /></td>
                     <td><Form.Control as="input" name="lPoz" defaultValue={this.props.poz}  readOnly  /></td>
                     <td colSpan={5} className="text-danger"> Czy na pewno chcesz usunąć pozycje?</td>
                     <td><Button variant="outline-info" type="submit" className="pozcud" > Ok </Button></td>
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

export default PozycjaCud;