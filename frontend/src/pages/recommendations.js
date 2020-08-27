import React, { Component } from 'react';
import NavbarPage from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../App.css';
import { Column } from 'simple-flexbox';
import { Row } from 'simple-flexbox';
import '../components/design.css';
import Rbox from '../components/recommendInput';
import { get_JWT } from '../components/API/jwt';
import axios from 'axios';

class Recommend extends Component {

    state = {
        recommend_list: [],
        test: [{artist: "Maroon 5", song: "Lazy Song", date: "14/1/2014"},
                {astist: "Miley Cyris", song: "Party In The Usa", date: "25/9/2009"},
                {astist: "Taylor Swift", song: "Romeo and Juliet", date: "16/6/2009"},
                {astist: "Bruno Mars", song: "Mary You", date: "9/2/2017"},
                {astist: "IU", song: "I knew you were trouble", date: "21/4/2017"},
                {astist: "BlackPink", song: "Tell Me Why", date: "22/6/2017"},
                {astist: "Black Eye Peas", song: "Where Is The Love", date: "3/3/2020"},
                {astist: "Dua Lipa", song: "Don't Start Now", date: "3/3/2020"},
                {artist: "Kesha", song: "Rude", date: "12/2/2020"}]
    };


    async componentDidMount() {
        window.addEventListener('resize', this.resize);
        const jwt = get_JWT();
        try {
            this.setState({loading: true});
            const res = await axios.get('https://us-central1-popfeed-268519.cloudfunctions.net/popfeed/users/' + jwt) // this gives a promise back
            console.log(res.data.recommend)
            this.setState({recommend_list: res.data.recommend})
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
                    <span className="navTitle"> Song Recomendations</span>
                        
                        <div className="grid">

                        { 
                        (this.state.test === null|| this.state.test.artist_name)
                        ? <div className="multiTitle"> Add Artists to your Account</div>
                        :
                        this.state.test.map(item => (
                            <Rbox key={item._id} artist={item.artist} song={item.song} date={item.date} onDelete={this.handleDelete}/>
                        ))

                        }

                        </div>
                    </div>
                </Column>
            </Row>
        );
    }
}

export default Recommend;