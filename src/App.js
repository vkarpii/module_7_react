import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/pageComponents/Header";
import Footer from "./components/pageComponents/Footer";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Login from "./components/pages/Login";
import Registration from "./components/pages/Registration";
import Info from "./components/pages/Info";

export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            cookies: this.props.cookies,
            user: this.getUserFromCookies()
        }
    }

    getUserFromCookies = () => {
        let userObj = this.props.cookies.get('user-info');
        return  userObj !== undefined ? userObj.user : null;
    }

    render() {
        return (
            <div className="App">
                <Header cookies={this.state.cookies} user={this.state.user}/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" >
                            <Route index element={<Home user = {this.state.user}/>} />
                            <Route path="about" element={<About />} />
                            <Route path="login" element={<Login cookies={this.state.cookies}
                                                                user = {this.state.user}/>} />
                            <Route path="registration" element={<Registration cookies={this.state.cookies}
                                                                              user = {this.state.user}/>} />
                            <Route path="info" element={<Info user={this.state.user} />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
                <Footer/>
            </div>
        );
    }
}

