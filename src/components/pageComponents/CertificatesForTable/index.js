import React from "react";
import CertificateElement from "../CertificateElement";

const CertificatesForTable = ({data,user}) => {
    return(
        <>
            { data.map( certificate => (
                    <CertificateElement key={certificate.id}
                                        id={certificate.id}
                                        name={certificate.name}
                                        description={certificate.description}
                                        price={certificate.price}
                                        tags={certificate.tags}
                                        durationInDays={certificate.durationInDays}
                                        createDate={certificate.createDate}
                                        lastUpdateDate={certificate.lastUpdateDate}
                                        user={user}/>
            ))}
        </>
    );
};

export default CertificatesForTable;