import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import ModalAddCertificate from "../ModalAddCertificate";
import Roles from "../../../constants/role";
import {Navigate} from "react-router-dom";


export default class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            cookies: this.props.cookies,
            user: this.props.user,
            addModal: false,
        }
    }

    logout = () => {
        this.state.cookies.remove('user-info');
        this.state.cookies.remove('token');
        window.location.reload();
    }
    modalWindow = () => {
        this.setState({addModal:(!this.state.addModal)});
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Gift Certificate System</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        { (this.state.user !== null && this.state.user.role === Roles.Admin) &&
                            <>
                                <Nav.Link className="bg-primary rounded text-white"
                                          onClick={this.modalWindow}>Add</Nav.Link>
                                { this.state.addModal &&
                                    <ModalAddCertificate modalWindow={this.modalWindow}
                                    cookies={this.state.cookies}/>
                                }
                            </>
                        }
                    </Nav>
                    <Nav>
                        { (this.state.user === null) ? (
                            <>
                                <Nav.Link href="/login">
                                    <div className="d-flex">
                                        <span className="material-icons mx-1">login</span>
                                        <span>Login</span>
                                    </div>
                                </Nav.Link>
                                <Nav.Link href="/registration">
                                    <div className="d-flex">
                                        <span className="material-icons mx-1">how_to_reg</span>
                                        <span>Sign Up</span>
                                    </div>
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link href="/info">
                                    <div className="d-flex">
                                        <span className="material-icons mx-1">account_circle</span>
                                        <span>{this.state.user.login}</span>
                                    </div>
                                </Nav.Link>
                                <Nav.Link href="/login" onClick={this.logout}>
                                    <div className="d-flex">
                                        <span className="material-icons mx-1">logout</span>
                                        <span>Logout</span>
                                    </div>
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Container>
            </Navbar>
        )
    }

}