import React, { Component } from 'react';
import NavbarPage from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Column } from 'simple-flexbox';
import { Row } from 'simple-flexbox';
import '../components/design.css';
import Sbox from '../components/songInput';
import axios from 'axios';
import { get_JWT } from '../components/API/jwt';

class Songs extends Component {

    state = {
        song_list: [],
        test: [{artist: "Black Eye Peas", song: "Where Is The Love", date: "16/06/2009"},
                {astist: "Dua Lipa", song: "Don't Start Now", date: "7/1/2019"},
                {astist: "IU", song: "Palette", date: "21/3/2017"},
                {astist: "BlackPink", song: "As If Its Your Last", date: "22/5/2017"},
                {astist: "Magic", song: "Rude", date: "24/2/2013"},
                {artist: "DaBaby", song: "Toes", date: "27/09/2019"}]
        // test1: {hello: {hello1: hello2}}
    };

    async componentDidMount() {
        const jwt = get_JWT();
        window.addEventListener('resize', this.resize);
        // const query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
        try {
            this.setState({loading: true});
            // const res = await axios.get('https://us-central1-popfeed-268519.cloudfunctions.net/popfeed/artist?id=' + jwt) // this gives a promise back
            const res = await axios.get('http://localhost:5000/songs?id=' + jwt) // this gives a promise back
            console.log(res.data)
            this.setState({song_list: res.data})
        }  catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <Row className="mainContainer">
                <Sidebar />
                <Column flexGrow={1} className="mainBlock">
                    <NavbarPage />
                    <div className="gridContent">
                    <span className="navTitle">Songs</span>
                        
                        <div className="grid">
                        { 
                        (this.state.song_list.length === 0)
                        ? <div className="multiTitle"> Add Artists to your Account</div>
                        :
                        this.state.song_list.map(item => (
                            <Sbox 
                            key={item.song_name} 
                            song={item.song_name} 
                            artist={item.artist_name} 
                            album={item.album_name}
                            track={item.track_number}
                            link={item.song_preview}
                            />
                        ))
                        }

                        </div>
                    </div>
                </Column>
            </Row>
        );
    }
}

export default Songs;