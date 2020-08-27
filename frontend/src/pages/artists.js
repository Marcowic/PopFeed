import React, { Component } from 'react';
import NavbarPage from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Column } from 'simple-flexbox';
import { Row } from 'simple-flexbox';
import '../components/design.css';
import Abox from '../components/artistInput';
import { get_JWT } from '../components/API/jwt';
import qs from 'qs';
import axios from 'axios';

class Artists extends Component {

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
        // window.location.reload();
    }

    resize = () => this.forceUpdate();

    state = {
        artist_list: [],
        // heading: 'Top 10 Songs'
        test: [{artist: "Bruno Mars", song: "Lazy Song", date: "1/2/2020"},
                {astist: "Taylor Swift", song: "I knew you were trouble", date: "3/3/2020"},
                {artist: "Kesha", song: "Tiktok", date: "12/2/2020"}]
        // test: null
    };

    async addArtist() {
        const query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
        const jwt = get_JWT();
        try {
            // const res = await axios.post('https://us-central1-popfeed-268519.cloudfunctions.net/popfeed/users/addToFollowingList', {artist: query.q.toLowerCase(), id: jwt}) // this gives a promise back
            const res = await axios.post('http://localhost:5000/users/addToFollowingList', {artist: query.q.toLowerCase(), id: jwt}) // this gives a promise back
            console.log(res.data)
            if(res.data.result === null) {
                this.setState({page: true})
            }
            console.log("works")
        }  catch (e) {
            console.log(e);
        }     
    }

    async componentDidMount() {
        const jwt = get_JWT();
        window.addEventListener('resize', this.resize);
        // const query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
        try {
            // const res = await axios.get('https://us-central1-popfeed-268519.cloudfunctions.net/popfeed/artist?id=' + jwt) // this gives a promise back
            const res = await axios.get('http://localhost:5000/artist?id=' + jwt) // this gives a promise back
            console.log(res.data)
            this.setState({artist_list: res.data, loading: false})
        }  catch (e) {
            console.log(e);
        }
    }

    handleDelete = async () => {
        const jwt = get_JWT();
        try {
            // get artist back
            // const res = await axios.get('https://us-central1-popfeed-268519.cloudfunctions.net/popfeed/users/') // this gives a promise back
            const res = await axios.get('http://localhost:5000/artist?id=' + jwt) // this gives a promise back
        
            console.log(res.data)
            this.setState({artist_list: res.data})
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
                    <span className="navTitle">Artists</span>
                        <div className="grid">

                        { 
                        (this.state.artist_list.length === 0)
                        ? <div className="multiTitle"> Add Artists to your Account</div>
                        :
                        this.state.artist_list.map(item => (
                            <Abox key={item._id} artist={item.artist_name} song={item.most_relevant_album} date={item.updatedAt} onDelete={this.handleDelete}/>
                        ))

                        }

                        </div>
                    </div>
                </Column>
            </Row>
        );
    }
}

export default Artists;
