import React from "react";
import {Spinner} from "react-bootstrap";

const Loading = () => {
    return(
        <div className="w-99 h-auto text-center m-1 text-primary rounded mb-5 p-5">
            <h4>Please wait, page loading...</h4>
            <Spinner animation="border" size="xl"/>
        </div>
    );
}

export default Loading;