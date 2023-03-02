import {imgStyle} from "../About"
import {Navigate} from "react-router-dom";
import React from "react";

const Info = (props) => {

    const user = props.user;

    if (user === null)
        return <Navigate to="/"/>;

    return (
        <div style={{marginLeft:"35%",marginRight:"35%"}} className="mt-5 mb-5">
                <div className="col border p-5 text-center m-auto rounded shadow text-white" style={{backgroundColor:"#797979"}}>
                    <h2><span className="material-icons">info</span>Info about user</h2>
                    <hr/>
                    <img src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" style={imgStyle} className="text-white"/>
                    <p>{user.firstName} {user.lastName}</p>
                    <p>Login: {user.login}</p>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p>
                </div>
        </div>
    );
};

export default Info;