import Modal from "../Modal";
import React, {useState} from "react";
import {TagsInput} from "react-tag-input-component";
import Cookies from "universal-cookie/es6";


const ModalEditCertificate = (props) => {
    const getListOfTags = (tags) => {
        let newTags = [];
        props.tags.map(tag => {
            newTags.push(String(tag.tagName));
        });
        return newTags;
    }

    const [tags,setTags] = useState(getListOfTags(props.tags));
    const [name,setName] = useState(String(props.name));
    const [description,setDescription] = useState(String(props.description));
    const [durationInDays,setDurationInDays] = useState(Number(props.durationInDays));
    const [price,setPrice] = useState(Number(props.price));
    const [error,setError] = useState(null);
    const id = Number(props.id);

    const onSubmit = (e) => {
        fetchPut(name,description,durationInDays,tags,price);
    }

    const fetchPut = async (name,description,durationInDays,tags,price) => {
        await fetch("http://localhost:8080/api/gift-certificate/" + id ,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + new Cookies().get('token')
            },
            body: JSON.stringify({name,description,durationInDays,tags,price})
        })
            .then(response => response.json())
            .then(data => {
                if (data.errorMessage !== undefined){
                    console.log(data.errorMessage);
                    setError(data.errorMessage);
                }
            })
            .catch((er) => {
                console.error(er);
                setError(er.errorMessage);
            });
    }

    return (
        <Modal>
            <h3>Edit</h3>
            {error !== null &&
                <p className="bg-danger text-white rounded p-1">{error}</p>
            }
            <hr/>
            <form className="form" onSubmit={onSubmit}>
                <label>Certificate Name</label>
                <input className="w-100 p-1"
                       value={name}
                       onChange={event => setName(event.target.value)}
                       minLength="4"
                       maxLength="255"
                       required/>

                <label>Description</label>
                <input className="w-100 p-1"
                       value={description}
                       onChange={event => setDescription(event.target.value)}
                       minLength="4"
                       maxLength="255"
                       required/>

                <label>Durations (days)</label>
                <input type="number"
                       step="1"
                       min="1"
                       value={durationInDays}
                       onChange={event => setDurationInDays(Number(event.target.value))}
                       className="w-100 p-1"
                       required/>

                <label>Tags</label>
                <TagsInput
                    value={tags}
                    onChange={setTags}
                    name="tags"
                    placeHolder="Enter tags"
                                    />

                <label>Price</label>
                <input type="number"
                       step="0.001"
                       min="0.001"
                       value={price}
                       onChange={event => setPrice(Number(event.target.value))}
                       className="w-100 p-1"
                       required/>

                <div className="row mt-2">
                    <button className="col btn btn-warning rounded m-1 text-white" type="submit">Change</button>
                    <button className="col btn btn-light border border-1 rounded m-1 text-black" onClick={props.changeEdit}>Cancel</button>
                </div>

            </form>
        </Modal>
    );
};

export default ModalEditCertificate;