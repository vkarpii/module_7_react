import React from "react";
import "./index.css";
import {Navigate} from "react-router-dom";

export default class Registration extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            error: null,
            cookies: this.props.cookies,
            firstName:'',
            lastName:'',
            login:'',
            email:'',
            password:'',
            repPassword:''
        }
    }
    onChangeFirstName = (e) => {
        this.setState({firstName:e.target.value});
    }
    onChangeLastName = (e) => {
        this.setState({lastName:e.target.value});
    }
    onChangeLogin = (e) => {
        this.setState({login:e.target.value});
    }
    onChangeEmail = (e) => {
        this.setState({email:e.target.value});
    }
    onChangePassword = (e) => {
        this.setState({password:e.target.value});
    }
    onChangeRepPassword = (e) => {
        this.setState({repPassword:e.target.value});
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        if (this.state.password !== this.state.repPassword){
            this.setState({error:"Password does not match"})
            return;
        }
        this.fetchRegistration(this.state.firstName,this.state.lastName,this.state.email,this.state.login,this.state.password);
    }

    async fetchRegistration(firstName,lastName,email,login,password){
        await fetch("http://localhost:8080/api/user/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({firstName,lastName,email,login,password})
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.token === undefined){
                    this.setState({error:data.errorMessage})
                } else {
                    this.state.cookies.set('token', data.token);
                    const user = {
                        firstName: data.user.firstName,
                        lastName: data.user.lastName,
                        email: data.user.email,
                        login: data.user.login,
                        role: data.user.role
                    }
                    this.state.cookies.set('user-info', JSON.stringify({user}));
                    this.setState({redirect:true});
                    window.location.reload()
                }
            })
            .catch((er) => {
                this.setState({error:er});
            });
    }

    render() {
        if (this.state.user !== null)
            return <Navigate to="/"/>
        return(
            <form onSubmit={this.onSubmitForm}>
                <div className="container mt-4">
                    <h1>Register</h1>
                    { this.state.error !== null &&
                        <div>
                            <p className="bg-danger text-white rounded p-1">*{this.state.error}</p>
                        </div>
                    }
                    <hr/>
                    <div className="row register-form">
                        <div className="col">

                            <label htmlFor="firstName"><b>First Name</b></label>
                            <input type="text"
                                   className="w-100 p-2 mb-2"
                                   onChange={this.onChangeFirstName}
                                   value={this.state.firstName}
                                   placeholder="Enter First Name"
                                   name="firstName"
                                   id="firstName"
                                   pattern="[А-ЩЬЮЯҐЄІЇа-щьюяґєіїa-zA-Z ]{4,255}"
                                   title="First Name cannot consist of numbers, spaces, or special characters."
                                   minLength="4"
                                   maxLength="255"
                                   required/>

                            <label htmlFor="login"><b>Login</b></label>
                            <input type="text"
                                   className="w-100 p-2 mb-2"
                                   onChange={this.onChangeLogin}
                                   value={this.state.login}
                                   placeholder="Enter Login"
                                   name="login"
                                   id="login"
                                   pattern="[a-zA-Z_-]{1,255}[0-9]{0,255}"
                                   title="The login can consist only of English letters, numbers, '_','-'. It cannot start with a digit!"
                                   minLength="3"
                                   maxLength="30"
                                   required/>

                            <label htmlFor="psw"><b>Password</b></label>
                            <input type="password"
                                   className="w-100 p-2 mb-2"
                                   onChange={this.onChangePassword}
                                   value={this.state.password}
                                   placeholder="Enter Password"
                                   name="psw"
                                   id="psw"
                                   minLength="4"
                                   maxLength="30"
                                   required/>

                        </div>
                        <div className="col">

                            <label htmlFor="lastName"><b>Last Name</b></label>
                            <input type="text"
                                   className="w-100 p-2 mb-2"
                                   onChange={this.onChangeLastName}
                                   value={this.state.lastName}
                                   placeholder="Enter Last Name"
                                   name="lastName"
                                   id="lastName"
                                   title="Last Name cannot consist of numbers, spaces, or special characters."
                                   pattern="[А-ЩЬЮЯҐЄІЇа-щьюяґєіїa-zA-Z]{4,255}"
                                   minLength="4"
                                   maxLength="255"
                                   required/>

                            <label htmlFor="email"><b>Email</b></label>
                            <input type="email"
                                   className="w-100 p-2 mb-2 border-0"
                                   onChange={this.onChangeEmail}
                                   value={this.state.email}
                                   placeholder="Enter Email"
                                   name="email"
                                   id="email"
                                   minLength="6"
                                   maxLength="255"
                                   required/>

                            <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
                            <input type="password"
                                   className="w-100 p-2 mb-2"
                                   onChange={this.onChangeRepPassword}
                                   value={this.state.repPassword}
                                   placeholder="Repeat Password"
                                   name="psw-repeat"
                                   id="psw-repeat"
                                   minLength="4"
                                   maxLength="30"
                                   required/>

                        </div>
                    </div>
                    <hr/>

                    <button type="submit" className="registerbtn">Register</button>
                </div>

                <div className="container signin ">
                    <p>Already have an account? <a href="/login">Sign in</a>.</p>
                </div>
            </form>
        );
    }

}