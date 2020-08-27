import React, { Component } from 'react';
import NavbarPage from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../App.css';
import { Column } from 'simple-flexbox';
import { Row } from 'simple-flexbox';
import '../components/design.css';
import Fbox from '../components/favouritesInput';
import axios from 'axios';
import { get_JWT } from '../components/API/jwt';

class Favourites extends Component {

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
        // window.location.reload();
    }

    resize = () => this.forceUpdate();

    state = {
        fav_list: [],
        test: [{head: "Maroon 5", sub: "Sugar", date: "14/1/2014", fav_id: "a"},
                {head: "See You Again", sub: "Sugar", date: "10/3/2015", fav_id: "s"},
                {head: "Despacito", sub: "Luis Fonsi", date: "12/1/2017", fav_id: "s"}]
    };

    async componentDidMount() {
        const jwt = get_JWT();
        window.addEventListener('resize', this.resize);
        try {
            // const res = await axios.get('https://us-central1-popfeed-268519.cloudfunctions.net/popfeed/artist?id=' + jwt) // this gives a promise back
            const res = await axios.get('http://localhost:5000/favourites?id=' + jwt) // this gives a promise back
            console.log(res.data)
            this.setState({fav_list: res.data})
        }  catch (e) {
            console.log(e);
        }
    }

    handleDelete = async () => {
        const jwt = get_JWT();
        try {
            // get artist back
            this.setState({loading: true});
            // const res = await axios.get('https://us-central1-popfeed-268519.cloudfunctions.net/popfeed/users/') // this gives a promise back
            const res = await axios.get('http://localhost:5000/favourites?id=' + jwt) // this gives a promise back
            console.log(res.data)
            this.setState({fav_list: res.data})
        }  catch (e) {
            console.log(e);
        }
    };

    render() {
        return (
            <Row className="mainContainer">
                <Sidebar />
                <Column flexGrow={1} className="mainBlock">
                    <NavbarPage />
                    <div className="gridContent">
                    <span className="navTitle">Favourites</span>
                        
                        <div className="grid">

                            { 
                            (this.state.fav_list.length === 0)
                            ? <div className="multiTitle"> Add Artists to your Account</div>
                            :
                            this.state.fav_list.map(item => (
                                <Fbox key={item.head} head={item.head} sub={item.sub} date={item.date} album={item.album} track={item.track} link={item.link} onDelete={this.handleDelete} fav_id={item.fav_id}/>
                            ))

                            }

                        </div>
                    </div>
                </Column>
            </Row>
        );
    }
}



export default Favourites;
