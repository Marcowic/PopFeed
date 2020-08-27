import React, { Component } from 'react';
import NavbarPage from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../App.css';
import { Column } from 'simple-flexbox';
import { Row } from 'simple-flexbox';
import '../components/design.css';
import axios from 'axios';
import { get_JWT } from '../components/API/jwt';
import MainComponent from '../components/MainContent';

class Notifications extends Component {
    // constructor(props) {
    //     super(props);
    //   }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    resize = () => this.forceUpdate();

    state = {
        artist_list: [],
        // test: ["Bruno Mars", "Taylor Swift", "Kesha"]
        test: []
    };

    // artist_list
    async componentDidMount() {
        window.addEventListener('resize', this.resize);
        
        const jwt = get_JWT();
        try {
            this.setState({loading: true});
            const res = await axios.get('https://us-central1-popfeed-268519.cloudfunctions.net/popfeed/users/' + jwt) // this gives a promise back
            console.log(res.data.recommend)
            this.setState({artist_list: res.data.recommend, loading: false})
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
                
                <div className="mainContent">
                    <span className="navTitle">Dashboard</span>

                    {
                        (this.state.test.length === 0) 
                        ? <div className="multiTitle">No artists found</div> 
                        : (<div> 
                            {this.state.test.map(item => (
                            <MainComponent title={item}
                            date="as of 25 May 2020, 09:41 PM"
                            content="The product being developed is best described as social media aggregator and song recommender. It will allow users to capture activities from a range of music artists such as promotions, concerts, new releases and social media updates which will then be displayed on a scrollable feed which is updated regularly. The term “aggregator” is used to label websites or programs which collect related data or items, the content of which to be displayed or linked."
                            concertPrice="£60"
                            albumName="Purpose"
                            location="Miami, Florida"
                            />      
                        ))}
                        </div>)
                    }
       
                </div>
            </Column>
        </Row>
    );
  }
}

export default Notifications;