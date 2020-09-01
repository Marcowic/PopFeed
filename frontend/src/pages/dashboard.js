import React, { Component } from 'react';
import NavbarPage from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Column } from 'simple-flexbox';
import { Row } from 'simple-flexbox';
import '../components/design.css';
import MainComponent from '../components/MainContent';
import axios from 'axios';
// import Spinner from '../images/Spinner';
import { get_JWT } from '../components/API/jwt';
import { withRouter } from 'react-router-dom';

class dashboard extends Component {
    // constructor(props) {
    //     super(props);
    //   }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    resize = () => this.forceUpdate();

    state = {
        artist_list: [],
        loading: false,
        test: ["Bruno Mars", "Taylor Swift", "Kesha"]

    };
    // artist_list
    async componentDidMount() {
        window.addEventListener('resize', this.resize);

        const jwt = get_JWT();
        try {
            this.setState({loading: true});
            // const res = await axios.get('https://us-central1-popfeed-268519.cloudfunctions.net/popfeed/dashboard?id=' + jwt) // this gives a promise back
            const res = await axios.get('https://us-central1-popfeed-web-app.cloudfunctions.net/popfeed/dashboard?id=' + jwt) // this gives a promise back
            console.log(res.data)
            console.log("work")
            this.setState({artist_list: res.data})
        }  catch (e) {
            console.log(e);
            // console.log("doesn't work")          
        }
        
    }

    render() {

    return (
        <Row className="mainContainer">
            <Sidebar />
            <Column flexGrow={1} className="mainBlock">
                <NavbarPage />

                <div className="mainContent">
                    <span className="multiTitle">Dashboard</span>

                        {
                        (this.state.artist_list.length === 0) 
                        ? <div className="multiTitle">No artists found, Search an artist.</div> 
                        : (
                            <div> 
                                {this.state.artist_list.map(item => (
                                    <div>
                                    <MainComponent 
                                    key={item._id}
                                    title={item.artist_name}
                                    date={item.createdAt}
                                    content={item.artist_description}                                   
                                    concertPrice={item.min + " " + item.currency + " - " + item.max + " " + item.currency}
                                    albumName={item.most_relevant_album}
                                    concert={item.latest_event}
                                    youtubeID={item.youtube_upload_id}
                                    youtubeTitle={item.youtube_upload_title}
                                    // youtubeChannel=""
                                    artistSearch={item.artist_name}
                                    />    
                                    </div>
                                ))}


                            </div>
                        )
                    }
               
                </div>
            </Column>
        </Row>
    );
  }
}

export default withRouter(dashboard);