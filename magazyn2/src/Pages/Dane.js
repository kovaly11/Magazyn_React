import React, {Component} from 'react';
import "./Pages.css"
import {Container, Tab, Nav} from "react-bootstrap";
import Adres from '../Components/Adres/Adres'
import Towar from '../Components/Towar/Towar'
import Firmy from '../Components/Firmy/Firmy'
import Magazyn from '../Components/Magazyn/Magazyn'

class Dane extends Component {
    render() {
        if (this.props.login > 0)
        return (
           <Container className="data-in-page">
               <Tab.Container fixed="top"  id="ledt-tabs-example" defaultActiveKey="firms" >
                           <Nav variant="tabs" className="mt-3">
                               <Nav.Item >
                                   <Nav.Link eventKey="firms" className="text-info bg-light" >Firmy</Nav.Link>
                               </Nav.Item>
                               <Nav.Item>
                                   <Nav.Link eventKey="towars" className="text-info bg-light">Towary</Nav.Link>
                               </Nav.Item>
                               <Nav.Item>
                                   <Nav.Link eventKey="magazyns" className="text-info bg-light">Magazyny</Nav.Link>
                               </Nav.Item>
                               <Nav.Item>
                                   <Nav.Link eventKey="adresy" className="text-info bg-light">Adresy</Nav.Link>
                               </Nav.Item>
                           </Nav>
                           <Tab.Content >
                               <Tab.Pane eventKey="firms">
                                   <div><Firmy /></div>
                               </Tab.Pane>
                               <Tab.Pane eventKey="towars">
                                   <div><Towar /></div>
                               </Tab.Pane>
                               <Tab.Pane eventKey="magazyns">
                                   <div><Magazyn /></div>
                               </Tab.Pane>
                               <Tab.Pane eventKey="adresy">
                                   <div><Adres /></div>
                               </Tab.Pane>
                           </Tab.Content>
               </Tab.Container>
           </Container>
        );
        else
            return (
                <div className="data-in-page"> <h2 class="text-danger">Login error</h2></div>
            );
    }
}

export default Dane;