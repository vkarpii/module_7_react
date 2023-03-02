import React from "react";
import ReactPaginate from 'react-paginate';
import "./style.css";

export default class Pagination extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            currentPage: this.props.currentPage,
            elementsPerPage: this.props.elementsPerPage,
            totalCount : this.props.totalCount
        }
    }

    onChange = (e) => {
        this.setState({elementsPerPage: e.target.value})
        this.props.onChangeElementsPerPage( e.target.value);
    }

    pageChange = (selected) => {
        this.props.onChangePage(selected.selected);
    }
    pageCount = () => {
        return Math.ceil(this.state.totalCount / this.state.elementsPerPage);
    }

    render() {
        return(
            <div className="row me-auto m-2 mb-5 p-2">
                <div className="col"></div>
                <div className="col text-center">
                    <ReactPaginate
                        containerClassName={"pagination"}
                        previousLinkClassName={"pagination__link"}
                        nextLinkClassName={"pagination__link"}
                        disabledClassName={"pagination__link--disabled"}
                        activeClassName={"pagination__link--active"}
                        breakLabel="..."
                        nextLabel=" > "
                        onPageChange={this.pageChange}
                        pageRangeDisplayed={3}
                        pageCount={this.pageCount()}
                        previousLabel=" < "
                        renderOnZeroPageCount={null}
                        initialPage={this.state.currentPage < this.pageCount() ? this.state.currentPage : 0}
                    />
                </div>
                <div className="col text-end">
                    <select defaultValue={this.state.elementsPerPage} onChange={this.onChange}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </div>

            </div>
        )
    }
}