import React from "react";
import { Navigate } from "react-router-dom";

export default class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            cookies: this.props.cookies,
            error: null
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        let login = e.target.login.value;
        let password = e.target.password.value;
        this.setState({isLoading:true});
        this.fetchLogin(login,password);
    }

    async fetchLogin(login,password){
        console.log(JSON.stringify(login,password));
        await fetch("http://localhost:8080/api/user/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({login,password})
        })
            .then(response => response.json())
            .then(data => {
                if (data.token === undefined){
                    this.setState({error:data.errorMessage});
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
                    window.location.reload();
                }
            })
            .catch((er) => {
                console.error(er);
                this.setState({error:er.errorMessage})
            });
    }

    render() {
        if (this.state.user !== null)
            return <Navigate to="/"/>

        return(
                <div className="container py-5 h-100 mb-4" >
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card shadow-2-strong bg-dark text-white" style={{borderRadius:"1rem"}}>
                                <div className="card-body p-5 text-center">

                                    <form onSubmit={this.onSubmit}>
                                        <h4 className="mb-4">SIGN IN</h4>
                                        { this.state.error !== null &&
                                            <div>
                                                <p className="bg-danger text-white rounded p-1">*{this.state.error}</p>
                                            </div>
                                        }
                                        <div className="form-outline mb-3">
                                            <input type="text"
                                                   className="form-control form-control-lg text-center"
                                                   name="login"
                                                   minLength="3"
                                                   maxLength="30"
                                                   required/>
                                            <label className="form-label" htmlFor="typeLoginX-2">Login</label>
                                        </div>

                                        <div className="form-outline mb-3">
                                            <input type="password"
                                                   name="password"
                                                   className="form-control form-control-lg text-center"
                                                   minLength="4"
                                                   maxLength="30"
                                                   required/>
                                            <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                                        </div>

                                        <button className="btn btn-success btn-lg btn-block" type="submit">Login</button>
                                    </form>

                                    {/*<hr className="my-4"/>

                                        <button className="btn btn-lg btn-block btn-primary"
                                                style={{backgroundColor:"#dd4b39"}}
                                                type="submit"><i className="fab fa-google me-2"></i> Sign in with Google
                                        </button>*/}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}