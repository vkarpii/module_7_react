import React, {useState} from "react";
import Modal from "../Modal";
import Cookies from "universal-cookie/es6";
import ModalEditCertificate from "../ModalEditCertificate";
import Roles from "../../../constants/role";

const CertificateElement = ({name,description,price,id,user,tags,durationInDays,lastUpdateDate,createDate}) => {

    const [modal,setModal] = useState(false);
    const [conf,setConf] = useState(false);
    const [edit,setEdit] = useState(false);
    const [error,setError] = useState(null);

    const changeEdit = () => {
        setEdit(!edit);
    }

    const changeModal = () => {
        setModal(!modal);
    }

    const changeConf = () => {
        setConf(!conf);
    }

async function fetchDelete() {
    fetch("http://localhost:8080/api/gift-certificate/" + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + new Cookies().get('token')
        }
    })
        .catch((er) => {
            setError(er);
        });
    changeConf();
    window.location.reload();
}

const deleteCertificate = () => {
        console.log("Delete");
        fetchDelete();
    }
    const concatString = (str,len) => {
        return str.length <= len ? str: str.slice(0,len)+"..."
    }

    return(
        <tr key={id}>
            <td>{createDate}</td>
            <th scope="row"> {concatString(name,30)}</th>
            <td> {concatString(description,30)}</td>
            <td>{price}</td>
            <td>
                <button onClick={changeModal} className="btn btn-primary rounded mx-1">View</button>
                { modal &&
                    <Modal>
                        <div className="row">
                            <h3 className="col-9 rounded m-1">Certificate View</h3>
                            <button className="col btn btn-danger rounded text-center m-1" onClick={changeModal}><b>X</b></button>
                        </div>
                        <hr className="bg-black"/>
                        <p>Certificate Name : {name}</p>
                        <p>Description :  {concatString(description,100)}</p>
                        <p>Create Date : {createDate}</p>
                        <p>Last Update Date : {lastUpdateDate}</p>

                        <p>Tags : { tags.map(tag => (
                            <span className="border border-2 border-dark m-2 rounded">{tag.tagName} </span>
                            ))
                        }</p>

                        <p>Duration : {durationInDays} day(-s)</p>
                        <p><b>Price : {price} $</b></p>
                    </Modal>
                }
                { (user !== null && user.role === Roles.Admin) &&
                    <>
                        <button onClick={changeEdit} className="btn btn-warning text-white rounded mx-1">Edit</button>
                        { edit &&
                            <ModalEditCertificate changeEdit={changeEdit}
                                                  name={name}
                                                  description={description}
                                                  createDate={createDate}
                                                  lastUpdateDate={lastUpdateDate}
                                                  tags={tags}
                                                  durationInDays={durationInDays}
                                                  price={price}
                                                    id={id}/>
                        }

                        <button onClick={changeConf} className="btn btn-danger text-white rounded mx-1">Delete</button>
                        { conf &&
                            <Modal>
                                <h3 className="col"><span className="material-icons">report_problem</span> Delete Confirmation</h3>
                                <hr/>
                                <p>Do you really want to delete certificate with id = {id} ?</p>
                                <div className="row">
                                    <button className="col btn btn-danger rounded m-1 text-white" onClick={deleteCertificate}>Yes</button>
                                    <button className="col btn btn-light border border-1 rounded m-1 text-black" onClick={changeConf}>No</button>
                                </div>
                            </Modal>
                        }

                    </>
                }
            </td>
        </tr>
    );
};

export default CertificateElement;