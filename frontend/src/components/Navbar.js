import React, { Component } from 'react';
// import { string } from 'prop-types';
import { Row } from 'simple-flexbox';
import IconSearch from '../images/search';
// import IconBellNew from '../images/bell';
import './design.css'
import { withRouter } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



class HeaderComponent extends Component {

    // input = "/search?q=" + this.refs.searchInput.value

    handleClickSearch = () => {
        if(this.refs.searchInput.value === "?q=") {
            toast("Enter an artist");
            // console.log("not read")
        } else {
            this.props.history.push("/search?q=" + this.refs.searchInput.value);
        }
    };
      
    render() {
        return (
            <Row className="navContainer" vertical="center" horizontal="space-between" >
                <span className="navTitle">PopFeed</span>
                <ToastContainer />
                <Row vertical="center">
                    <form className="navBox" onSubmit={(e) => {
                        e.preventDefault();
                        // this.props.history.push("/search?q=" + this.refs.searchInput.value);
                        // refresh="true"
                        if(this.refs.searchInput.value === "?q=") {
                            toast("Enter an artist");
                            // console.log("not read")
                        } else {
                            this.props.history.push("/search?q=" + this.refs.searchInput.value);
                        }
                    }}>
                        <input ref="searchInput" id="input" aria-label="input bar to search" className="navSearchInput" required placeholder="Type and hit enter"/>
                    </form>

                    <div className="navIconStyles" id="searchBtn" aria-label="search button" onClick={this.handleClickSearch}>
                        <IconSearch />
                    </div>
                    <div className="navSeparator"></div>
                </Row>
            </Row>
        )
    }
}

export default withRouter(HeaderComponent);