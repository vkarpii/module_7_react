import React from "react";
import UrlParams from "../../../constants/params";
import {map} from "react-bootstrap/ElementChildren";

const filterStyle = {
    backgroundColor: "#ececec"
};

export default class SearchBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            map:new Map(this.props.filterMap),
            searchType: UrlParams.SearchByName.toString(),
            searchQuery:''
        }
    }

    componentDidMount() {
        if (this.state.map.get(UrlParams.SearchByDesc) !== ''){
            this.setState({searchQuery:this.state.map.get(UrlParams.SearchByDesc),
                                searchType:UrlParams.SearchByDesc.toString()})
        }
        if (this.state.map.get(UrlParams.SearchByName) !== ''){
            this.setState({searchQuery:this.state.map.get(UrlParams.SearchByName),
                                searchType:UrlParams.SearchByName.toString()})
        }
        if (this.state.map.get(UrlParams.OrderByName) !== ''){
            let arr = this.state.map.get(UrlParams.OrderByName).split(":");
            console.log(arr[0]+arr[1]);
            document.getElementById(arr[0]+arr[1]).setAttribute("checked","true");
        }
        if (this.state.map.get(UrlParams.OrderByDate) !== ''){
            let arr = this.state.map.get(UrlParams.OrderByDate).split(":");
            console.log(arr[0]+arr[1]);
            document.getElementById(arr[0]+arr[1]).setAttribute("checked","true");
        }
    }

    changeSelect = (e) => {
        this.setState({searchType:e.target.value})
    }

    changeQuery = (e) => {
        this.setState({searchQuery:e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault();
        let copy = this.state.map;
        if (this.state.searchType === UrlParams.SearchByName.toString()){
            copy.set(UrlParams.SearchByName,this.state.searchQuery);
            copy.set(UrlParams.SearchByDesc,'');
        } else {
            copy.set(UrlParams.SearchByDesc,this.state.searchQuery);
            copy.set(UrlParams.SearchByName,'');
        }
        this.setState({map:copy});
        console.log(copy);
        this.props.onChange(copy);
    }

    onClickRadioName = (e) => {
        let copy = this.state.map;
        copy.set(UrlParams.OrderByName,e.target.value);
        this.setState({map:copy});
    }

    onClickRadioDate = (e) => {
        let copy = this.state.map;
        copy.set(UrlParams.OrderByDate,e.target.value);
        this.setState({map:copy});
    }

    render() {
        return (
            <>
                <form className="p-3 mx-lg-5 shadow rounded-4 m-2" onSubmit={this.onSubmit} style={filterStyle}>
                    <div className="row justify-content-center align-items-center w-100">
                        <div className="col-1 border border-0 text-center" style={filterStyle}>
                            <p><b>Create Date</b></p>
                            <div onChange={this.onClickRadioDate}>
                                <div className="col">
                                    <input type="radio" id="createDateasc" value="createDate:asc" name="createDate"/>
                                    <label htmlFor="createDateasc">By growth</label>
                                </div>
                                <div className="col">
                                    <input type="radio" id="createDatedesc" value="createDate:desc" name="createDate"/>
                                    <label htmlFor="createDatedesc">By decline</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-1 border border-0 text-center" style={filterStyle}>
                            <p><b>Name</b></p>
                            <div onClick={this.onClickRadioName}>
                                <div className="col">
                                    <input type="radio" id="certificateNameasc" value="certificateName:asc" name="nameFilter"/>
                                    <label htmlFor="certificateNameasc">By growth</label>
                                </div>
                                <div className="col">
                                    <input type="radio" id="certificateNamedesc" value="certificateName:desc" name="nameFilter"/>
                                    <label htmlFor="certificateNamedesc">By decline</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-2">
                            <select
                                className="w-100 p-2 border-0 rounded shadow"
                                onChange={this.changeSelect}
                                value={this.state.searchType}>
                                    <option value="giftCertificateName">By Name</option>
                                    <option value="giftCertificateDescription">By Description</option>
                            </select>
                        </div>

                        <div className="col">
                            <input className="w-100 p-2 border-0 rounded shadow"
                                   type="text"
                                   placeholder="Search..."
                                   value={this.state.searchQuery}
                                   onChange={this.changeQuery}/>
                        </div>

                        <div className="col-1">
                            <span className="input-group-btn">
                           <button className="btn btn-primary w-100 shadow" type="submit">Go</button>
                         </span>
                        </div>

                    </div>
                </form>
            </>
        );
    }
}