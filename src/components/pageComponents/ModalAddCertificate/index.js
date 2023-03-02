import {TagsInput} from "react-tag-input-component";
import Modal from "../Modal";
import React, {useState} from "react";


const ModalAddCertificate = (props) => {
    const [tags,setTags] = useState([]);
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [duration,setDuration] = useState('');
    const [price,setPrice] = useState('');
    const [error,setError] = useState(null);

    const onSubmitForm = (e) => {
        fetchAdd(name,description,duration,tags,price);
    }
    const fetchAdd = async (name,description,durationInDays,tags,price) => {
        await fetch("http://localhost:8080/api/gift-certificate", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + props.cookies.get('token')
            },
            body: JSON.stringify({name,description,durationInDays,tags,price})
        })
            .then(response => response.json())
            .then(data => {
                if (data.errorMessage !== undefined){
                    setError(data.errorMessage);
                }
            })
            .catch((er) => {
                setError(er.errorMessage);
            });
    }

    return(
        <Modal>
            <h3>Add Certificate</h3>
            {error !== null &&
                <p className="bg-danger text-white rounded p-1">{error}</p>
            }
            <hr/>
            <form className="form" onSubmit={onSubmitForm}>
                <label>Certificate Name</label>
                <input className="w-100 p-1"
                       onChange={event => setName(event.target.value)}
                       value={name}
                       minLength="4"
                       maxLength="255"
                       required/>

                <label>Description</label>
                <input className="w-100 p-1"
                       onChange={event => setDescription(event.target.value)}
                       value={description}
                       minLength="4"
                       maxLength="255"
                       required/>

                <label>Durations (days)</label>
                <input type="number"
                       step="1"
                       min="1"
                       className="w-100 p-1"
                       onChange={event => setDuration(event.target.value)}
                       value={duration}
                       required/>

                <label>Tags</label>
                <div>
                    <TagsInput
                        value={tags}
                        onChange={setTags}
                        name="tags"
                        placeHolder="Enter tags"
                    />
                </div>
                <label>Price</label>
                <input type="number"
                       step="0.001"
                       className="w-100 p-1"
                       onChange={event => setPrice(event.target.value)}
                       value={price}
                       min="0.001"
                       required/>

                <div className="row mt-2">
                    <button className="col btn btn-success text-white m-1 rounded" type="submit">Add</button>
                    <button className="col btn btn-light border border-1 rounded m-1" onClick={props.modalWindow}>Cancel</button>
                </div>

            </form>
        </Modal>
    );
}

export default ModalAddCertificate;