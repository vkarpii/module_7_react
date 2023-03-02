import React from "react";
import CertificatesForTable from "../CertificatesForTable";

const CertificateTable = ({data,user}) => {
    return(
        <div className="m-1 mx-5 border">
            <table className="table text-center">
                <thead className="bg-dark text-white">
                <tr>
                    <th scope="col">Create Date</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Price, $</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                <CertificatesForTable data={data} user={user}/>
                </tbody>
            </table>
        </div>
    );
};

export default CertificateTable;